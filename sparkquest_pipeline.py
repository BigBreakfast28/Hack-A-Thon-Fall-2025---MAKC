import sagemaker
import boto3
from sagemaker.workflow.pipeline import Pipeline
from sagemaker.workflow.parameters import ParameterString
from sagemaker.workflow.steps import ProcessingStep
from sagemaker.processing import ProcessingInput, ProcessingOutput
from sagemaker.sklearn.processing import SKLearnProcessor

# --- 1. CONFIGURE AWS & SAGEMAKER ---
print("Initializing SageMaker session...")
sagemaker_session = sagemaker.Session()
boto_session = boto3.Session()
region = boto_session.region_name

role = sagemaker.get_execution_role()
default_bucket = sagemaker_session.default_bucket()
pipeline_name = "SparkQuest-Career-Matcher-Pipeline"

print(f"Region: {region}")
print(f"Role: {role}")
print(f"Bucket: {default_bucket}")

# --- 2. DEFINE PIPELINE PARAMETERS ---
print("\nDefining pipeline parameters...")

personal_assessment_s3_uri = ParameterString(
    name="PersonalAssessmentS3Uri",
    default_value=f"s3://{default_bucket}/sparkquest/inputs/default/personal_assessment.txt"
)

creative_content_s3_uri = ParameterString(
    name="CreativeContentS3Uri",
    default_value=f"s3://{default_bucket}/sparkquest/inputs/default/creative_content_uri.txt"
)

# --- 3. CREATE PROCESSING SCRIPTS ---
print("Creating processing scripts...")

# Script 1: Text Analysis Processor
text_analysis_script = """
import json
import os
import sys

try:
    print("Starting text analysis...")
    
    # Read personal assessment
    input_path = '/opt/ml/processing/input/personal_assessment.txt'
    print(f"Reading from: {input_path}")
    
    if not os.path.exists(input_path):
        print(f"ERROR: Input file not found at {input_path}")
        sys.exit(1)
    
    with open(input_path, 'r') as f:
        assessment_text = f.read()
    
    print(f"Read {len(assessment_text)} characters")
    
    # Simple keyword analysis
    keywords = {
        'creative': 0,
        'analytical': 0,
        'technical': 0,
        'leadership': 0,
        'collaborative': 0,
        'problem': 0,
        'design': 0,
        'data': 0
    }
    
    text_lower = assessment_text.lower()
    for keyword in keywords:
        keywords[keyword] = text_lower.count(keyword)
    
    # Determine dominant trait
    if keywords['creative'] > 0 or keywords['design'] > 0:
        dominant = 'creative'
    elif keywords['analytical'] > 0 or keywords['data'] > 0:
        dominant = 'analytical'
    elif keywords['technical'] > 0:
        dominant = 'technical'
    elif keywords['leadership'] > 0:
        dominant = 'leadership'
    else:
        dominant = 'collaborative'
    
    # Generate analysis
    analysis = {
        'text_length': len(assessment_text),
        'keywords': keywords,
        'dominant_trait': dominant,
        'assessment_summary': assessment_text[:200] if len(assessment_text) > 200 else assessment_text
    }
    
    # Save output
    output_dir = '/opt/ml/processing/output'
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, 'text_analysis.json')
    
    print(f"Writing to: {output_path}")
    with open(output_path, 'w') as f:
        json.dump(analysis, f, indent=2)
    
    print("Text analysis complete!")
    print(json.dumps(analysis, indent=2))
    
except Exception as e:
    print(f"ERROR in text analysis: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
"""

# Script 2: Video Analysis Processor
video_analysis_script = """
import json
import os
import sys

try:
    print("Starting video analysis...")
    
    # Read video URI
    input_path = '/opt/ml/processing/input/creative_content_uri.txt'
    print(f"Reading from: {input_path}")
    
    if not os.path.exists(input_path):
        print(f"ERROR: Input file not found at {input_path}")
        sys.exit(1)
    
    with open(input_path, 'r') as f:
        video_uri = f.read().strip()
    
    print(f"Video URI: {video_uri}")
    
    # Simulate video analysis (in real scenario, use AWS Rekognition, etc.)
    analysis = {
        'video_uri': video_uri,
        'detected_skills': ['presentation', 'creativity', 'communication'],
        'confidence_score': 0.85,
        'duration_estimate': 120,
        'quality_score': 'high'
    }
    
    # Save output
    output_dir = '/opt/ml/processing/output'
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, 'video_analysis.json')
    
    print(f"Writing to: {output_path}")
    with open(output_path, 'w') as f:
        json.dump(analysis, f, indent=2)
    
    print("Video analysis complete!")
    print(json.dumps(analysis, indent=2))
    
except Exception as e:
    print(f"ERROR in video analysis: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
"""

# Script 3: Talent Assessment Aggregator
aggregator_script = """
import json
import os
import sys

try:
    print("Starting talent assessment aggregation...")
    
    # Read text analysis
    text_path = '/opt/ml/processing/input/text/text_analysis.json'
    print(f"Reading text analysis from: {text_path}")
    
    if not os.path.exists(text_path):
        print(f"ERROR: Text analysis not found at {text_path}")
        sys.exit(1)
    
    with open(text_path, 'r') as f:
        text_analysis = json.load(f)
    
    print("Text analysis loaded successfully")
    
    # Read video analysis
    video_path = '/opt/ml/processing/input/video/video_analysis.json'
    print(f"Reading video analysis from: {video_path}")
    
    if not os.path.exists(video_path):
        print(f"ERROR: Video analysis not found at {video_path}")
        sys.exit(1)
    
    with open(video_path, 'r') as f:
        video_analysis = json.load(f)
    
    print("Video analysis loaded successfully")
    
    # Aggregate and match to careers
    dominant_trait = text_analysis.get('dominant_trait', 'collaborative')
    video_skills = video_analysis.get('detected_skills', [])
    
    print(f"Dominant trait: {dominant_trait}")
    
    # Career matching logic
    career_matches = []
    
    if dominant_trait == 'creative':
        career_matches.extend([
            {'title': 'UX Designer', 'match_score': 0.92, 'description': 'Design user experiences and interfaces'},
            {'title': 'Creative Director', 'match_score': 0.88, 'description': 'Lead creative strategy and execution'},
            {'title': 'Content Creator', 'match_score': 0.85, 'description': 'Develop engaging content across platforms'}
        ])
    elif dominant_trait == 'analytical':
        career_matches.extend([
            {'title': 'Data Scientist', 'match_score': 0.90, 'description': 'Analyze complex data to drive insights'},
            {'title': 'Business Analyst', 'match_score': 0.87, 'description': 'Bridge business needs with technical solutions'},
            {'title': 'Research Analyst', 'match_score': 0.84, 'description': 'Conduct research and provide strategic insights'}
        ])
    elif dominant_trait == 'technical':
        career_matches.extend([
            {'title': 'Software Engineer', 'match_score': 0.93, 'description': 'Build and maintain software systems'},
            {'title': 'DevOps Engineer', 'match_score': 0.89, 'description': 'Automate and optimize infrastructure'},
            {'title': 'Cloud Architect', 'match_score': 0.86, 'description': 'Design scalable cloud solutions'}
        ])
    elif dominant_trait == 'leadership':
        career_matches.extend([
            {'title': 'Product Manager', 'match_score': 0.91, 'description': 'Lead product strategy and development'},
            {'title': 'Team Lead', 'match_score': 0.87, 'description': 'Manage and mentor team members'},
            {'title': 'Program Manager', 'match_score': 0.84, 'description': 'Coordinate complex programs and initiatives'}
        ])
    else:
        career_matches.extend([
            {'title': 'Project Manager', 'match_score': 0.85, 'description': 'Plan and execute projects successfully'},
            {'title': 'Operations Manager', 'match_score': 0.82, 'description': 'Optimize business operations'},
            {'title': 'Account Manager', 'match_score': 0.80, 'description': 'Build and maintain client relationships'}
        ])
    
    # Create final report
    final_report = {
        'candidate_profile': {
            'dominant_trait': dominant_trait,
            'text_analysis': text_analysis,
            'video_analysis': video_analysis
        },
        'career_recommendations': career_matches,
        'overall_confidence': video_analysis.get('confidence_score', 0.75),
        'next_steps': [
            'Review the matched career paths',
            'Explore skill development opportunities',
            'Connect with professionals in these fields'
        ]
    }
    
    # Save output
    output_dir = '/opt/ml/processing/output'
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, 'final_job_list.json')
    
    print(f"Writing final report to: {output_path}")
    with open(output_path, 'w') as f:
        json.dump(final_report, f, indent=2)
    
    print("Talent assessment complete!")
    print(json.dumps(final_report, indent=2))
    
except Exception as e:
    print(f"ERROR in aggregation: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
"""

# Upload scripts to S3
print("Uploading processing scripts to S3...")
s3_client = boto_session.client('s3')

scripts = {
    'text_analysis.py': text_analysis_script,
    'video_analysis.py': video_analysis_script,
    'aggregator.py': aggregator_script
}

script_s3_uris = {}
for script_name, script_content in scripts.items():
    s3_key = f"sparkquest/scripts/{script_name}"
    s3_client.put_object(
        Bucket=default_bucket,
        Key=s3_key,
        Body=script_content
    )
    script_s3_uris[script_name] = f"s3://{default_bucket}/{s3_key}"
    print(f"  ✓ {script_name} uploaded")

# --- 4. DEFINE PROCESSING STEPS ---
print("\nDefining pipeline steps...")

# Step 1: Text Analysis
sklearn_processor_text = SKLearnProcessor(
    framework_version='1.2-1',
    role=role,
    instance_type='ml.m5.large',
    instance_count=1,
    base_job_name='sparkquest-text-analysis',
    sagemaker_session=sagemaker_session
)

step_text_analysis = ProcessingStep(
    name='TextAnalysis',
    processor=sklearn_processor_text,
    inputs=[
        ProcessingInput(
            source=personal_assessment_s3_uri,
            destination='/opt/ml/processing/input/personal_assessment.txt',
            s3_input_mode='File'
        )
    ],
    outputs=[
        ProcessingOutput(
            output_name='text_analysis',
            source='/opt/ml/processing/output',
            destination=f"s3://{default_bucket}/sparkquest/output/text-analysis"
        )
    ],
    code=script_s3_uris['text_analysis.py']
)

# Step 2: Video Analysis
sklearn_processor_video = SKLearnProcessor(
    framework_version='1.2-1',
    role=role,
    instance_type='ml.m5.large',
    instance_count=1,
    base_job_name='sparkquest-video-analysis',
    sagemaker_session=sagemaker_session
)

step_video_analysis = ProcessingStep(
    name='VideoAnalysis',
    processor=sklearn_processor_video,
    inputs=[
        ProcessingInput(
            source=creative_content_s3_uri,
            destination='/opt/ml/processing/input/creative_content_uri.txt',
            s3_input_mode='File'
        )
    ],
    outputs=[
        ProcessingOutput(
            output_name='video_analysis',
            source='/opt/ml/processing/output',
            destination=f"s3://{default_bucket}/sparkquest/output/video-analysis"
        )
    ],
    code=script_s3_uris['video_analysis.py']
)

# Step 3: Aggregator (depends on both previous steps)
sklearn_processor_aggregator = SKLearnProcessor(
    framework_version='1.2-1',
    role=role,
    instance_type='ml.m5.large',
    instance_count=1,
    base_job_name='sparkquest-aggregator',
    sagemaker_session=sagemaker_session
)

step_aggregator = ProcessingStep(
    name='TalentAssessmentAggregator',
    processor=sklearn_processor_aggregator,
    inputs=[
        ProcessingInput(
            source=step_text_analysis.properties.ProcessingOutputConfig.Outputs['text_analysis'].S3Output.S3Uri,
            destination='/opt/ml/processing/input/text',
            s3_input_mode='File'
        ),
        ProcessingInput(
            source=step_video_analysis.properties.ProcessingOutputConfig.Outputs['video_analysis'].S3Output.S3Uri,
            destination='/opt/ml/processing/input/video',
            s3_input_mode='File'
        )
    ],
    outputs=[
        ProcessingOutput(
            output_name='final_job_list',
            source='/opt/ml/processing/output',
            destination=f"s3://{default_bucket}/sparkquest/output/final-report"
        )
    ],
    code=script_s3_uris['aggregator.py']
)

# --- 5. CREATE AND DEPLOY PIPELINE ---
print("\nCreating pipeline...")

pipeline = Pipeline(
    name=pipeline_name,
    parameters=[
        personal_assessment_s3_uri,
        creative_content_s3_uri
    ],
    steps=[
        step_text_analysis,
        step_video_analysis,
        step_aggregator
    ],
    sagemaker_session=sagemaker_session
)

print(f"Pipeline '{pipeline_name}' defined with {len(pipeline.steps)} steps")

# Upsert (create or update) the pipeline
print("\nDeploying pipeline to SageMaker...")
response = pipeline.upsert(role_arn=role)

print("\n" + "="*60)
print("✅ SUCCESS! Pipeline deployed successfully!")
print("="*60)
print(f"\nPipeline Name: {pipeline_name}")
print(f"Region: {region}")
print(f"Bucket: {default_bucket}")
print(f"\nPipeline ARN: {response['PipelineArn']}")
print("\nPipeline steps:")
print("  1. TextAnalysis - Analyzes personal assessment text")
print("  2. VideoAnalysis - Analyzes creative content video")
print("  3. TalentAssessmentAggregator - Matches candidate to careers")
print("\n" + "="*60)
print("You can now run the interactive script to execute this pipeline.")
print("="*60)