exports.handler = async (event, context) => {
    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = 'Task';
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify(data.records) };
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch tasks' }) };
    }
}
