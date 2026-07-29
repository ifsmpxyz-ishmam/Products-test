exports.handler = async (event, context) => {
    const token = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = 'Products';
}
const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
try {
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
} catch (error) {
    console.error('Error fetching products:', error);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch products' })
    };
}
