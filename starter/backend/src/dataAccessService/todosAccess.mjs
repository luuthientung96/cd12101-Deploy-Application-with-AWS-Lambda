import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function saveTodo(todo) {
    const params = {
        TableName: process.env.TODOS_TABLE,
        Item: todo,
    };
    await dynamoDb.put(params).promise();
    return todo;
}

export async function deleteTodo(userId, todoId) {
    const params = {
        TableName: process.env.TODOS_TABLE,
        Key: { userId, todoId },
    };
    await dynamoDb.delete(params).promise();
}

export async function getTodos(userId) {
    const params = {
        TableName: process.env.TODOS_TABLE,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId,
        },
    };
    const result = await dynamoDb.query(params).promise();
    return result.Items;
}

export async function updateTodo(userId, todoId, updatedTodo) {
    const params = {
        TableName: process.env.TODOS_TABLE,
        Key: { userId, todoId },
        UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeNames: {
            '#name': 'name',
        },
        ExpressionAttributeValues: {
            ':name': updatedTodo.name,
            ':dueDate': updatedTodo.dueDate,
            ':done': updatedTodo.done,
        },
        ReturnValues: 'ALL_NEW',
    };
    const result = await dynamoDb.update(params).promise();
    return result.Attributes;
}
