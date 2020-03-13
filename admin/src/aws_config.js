const awsConfig = {
  aws_project_region: 'us-east-1',
  aws_cloud_logic_custom: [
      {
          name: 'fugo',
          endpoint: 'https://dmx2dmfo32.execute-api.us-east-1.amazonaws.com/prod',
          region: 'us-east-1'
      }
  ]
}

export default awsConfig;