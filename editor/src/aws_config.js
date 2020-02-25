const awsConfig = {
  aws_project_region: 'us-east-1',
  aws_cloud_logic_custom: [
      {
          name: 'hugo',
          endpoint: ' https://k7xk4htw7f.execute-api.us-east-1.amazonaws.com/prod',
          region: 'us-east-1'
      }
  ]
}

export default awsConfig;