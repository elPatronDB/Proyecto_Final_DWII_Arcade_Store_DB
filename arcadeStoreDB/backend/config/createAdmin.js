import { User } from '../models/Users.js';

const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@arcadestore.com' });
    
    if (!adminExists) {
      const adminUser = new User({
        nombre: 'Administrador ArcadeStore',
        email: 'admin@arcadestore.com',
        password: 'admin123',
        rol: 'admin'
      });

      await adminUser.save();
      console.log('Usuario administrador creado exitosamente');
      console.log('Email: admin@arcadestore.com');
      console.log('Password: admin123');
    } else {
      console.log('Usuario administrador ya existe');
    }
  } catch (error) {
    console.error('Error creando usuario administrador:', error);
  }
};

export default createAdminUser;