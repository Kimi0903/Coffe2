const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true, min: 1 },
  precioUnitario: { type: Number, required: true },
  notas: { type: String }
});

const PedidoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  items: [ItemSchema],
  estado: { 
    type: String, 
    enum: ['pendiente', 'en_proceso', 'completado', 'cancelado'],
    default: 'pendiente'
  },
  total: { type: Number, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  metodoPago: { type: String, enum: ['efectivo', 'tarjeta', 'transferencia'], required: true }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
