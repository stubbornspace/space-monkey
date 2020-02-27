const awsConfig = {
  aws_project_region: 'us-east-1',
  aws_cloud_logic_custom: [
      {
          name: 'hugo',
          endpoint: 'https://j6dy6jnx75.execute-api.us-east-1.amazonaws.com/prod',
          region: 'us-east-1'
      }
  ]
}

export default awsConfig;