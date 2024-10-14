const bcrypt = require('bcrypt');

async function testPasswordHashing() {
    const plainPassword = 'tobyboy'; // รหัสผ่านที่ต้องการแฮช
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    console.log('Hashed Password:', hashedPassword);

    // ทดสอบการเปรียบเทียบรหัสผ่าน
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Password Match:', match);
}

testPasswordHashing().catch(err => {
    console.error('Error:', err);
});
