const Pedido = require('../models/Pedido');
const ProductoRepository = require('../repositories/productoRepository');

// Implementación del Repository Pattern
class PedidoRepository {
  constructor(model) {
    this.model = model;
  }

  async crear(pedidoData) {
    // Validar stock antes de crear el pedido
    for (const item of pedidoData.items) {
      const producto = await ProductoRepository.obtenerPorId(item.productoId);
      if (producto.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${producto.nombre}`);
      }
    }
    
    const pedido = new this.model(pedidoData);
    return await pedido.save();
  }

  // Otros métodos del repositorio...
}

const pedidoRepository = new PedidoRepository(Pedido);

exports.crearPedido = async (req, res) => {
  try {
    const pedido = await pedidoRepository.crear(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Otros controladores...
