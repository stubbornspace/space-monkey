const AWS = require('aws-sdk'); 
const moment = require('moment'); 
const shortid = require('shortid'); 
 
AWS.config.logger = console;

/** 
 * @function listPosts 
 * Description: returns a list of posts from dynamoDB 
 */ 
const listPosts = async () => { 
    const dynamoDB = new AWS.DynamoDB.DocumentClient({ 
        region: process.env.AWS_REGION 
    }); 
    let data; 
    try { 
        const params = { 
            TableName: process.env.DB_TABLE
        }; 
        data = await dynamoDB.scan(params).promise();
        data = data.Items;
    } catch (err) { 
        throw err; 
    } 
    return data; 
}; 


/** 
 * @function getPost 
 * Description: returns a post from dynamodb 
 */ 
const getPost = async (uuid) => { 
    const dynamoDB = new AWS.DynamoDB.DocumentClient({ 
        region: process.env.AWS_REGION 
    }); 
    let data; 
    try { 
        const params = { 
            TableName: process.env.DB_TABLE,
             Key: { 
                uuid: uuid
            }
        }; 
        data = await dynamoDB.get(params).promise(); 
        data = data.Item;
    } catch (err) { 
        throw err; 
    } 
    return data; 
}; 


/** 
 * @function createPost 
 * Description: save a post to dynamodb 
 */ 
const createPost = async (config) => { 
    const dynamoDB = new AWS.DynamoDB.DocumentClient({ 
        region: process.env.AWS_REGION 
    }); 
     const s3 = new AWS.S3({ 
        region: process.env.AWS_REGION 
    }); 
    
    let data;
    let params;
    
    try {
        let uuid;
         if (config.uuid) {
            uuid = config.uuid;
        } else {
            uuid = shortid.generate();
        }
        
        const file = `${process.env.PATH}/${config.uuid}.md`;
        
        params = {
            Body: config.md, 
            Bucket:process.env.S3_BUCKET , 
            Key: file
        };
        await s3.putObject(params).promise();
        
        params = { 
            TableName: process.env.DB_TABLE,
             Key: { 
                uuid: uuid
             },
             UpdateExpression: 'set #t = :t, #d = :d, #f = :f', 
            ExpressionAttributeNames: { 
                '#t': 'title', 
                '#d': 'date', 
                '#f': 'file'
            }, 
            ExpressionAttributeValues: { 
                ':t': config.title, 
                ':d': moment().utc().format('YYYY-MM-DD HH:mm:ss'), 
                ':f': file
            }, 
            ReturnValues: 'ALL_NEW' 
        }; 
        data = await dynamoDB.update(params).promise(); 
    } catch (err) { 
        throw err; 
    } 
    return data;
}; 


/** 
 * @function deletePost 
 * Description: delete post dynamodb 
 */ 
const deletePost = async (uuid) => { 
    const dynamoDB = new AWS.DynamoDB.DocumentClient({ 
        region: process.env.AWS_REGION 
    }); 
    try {
        const params = { 
            TableName: process.env.DB_TABLE,
             Key: { 
                uuid: uuid
            }
        }; 
        await dynamoDB.delete(params).promise(); 
    } catch (err) { 
        throw err; 
    } 
    return 'success'; 
}; 


module.exports = { 
    listPosts: listPosts,
    getPost: getPost,
    createPost: createPost,
    deletePost: deletePost
};