const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dj0sefwqs', 
    api_key: '552537769799251', 
    api_secret: '<your_api_secret>'
});

async function uploadProduct(req, res) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Check if the file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const imageUrl = req.file.path;

        const productData = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: imageUrl, // Store Cloudinary URL
        };

        // Insert the product data into MongoDB
        const result = await collection.insertOne(productData);

        res.status(201).json({ message: 'Product uploaded successfully', data: result });
    } catch (error) {
        console.error('Error uploading product:', error);
        res.status(500).json({ error: 'Failed to upload product' });
    } finally {
        await client.close();
    }
}


module.exports = cloudinary;