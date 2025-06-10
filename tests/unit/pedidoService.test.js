const PedidoService = require('../../server/services/pedidoService');
const ProductoRepository = require('../../server/repositories/productoRepository');

jest.mock('../../server/repositories/productoRepository');

describe('PedidoService', () => {
  describe('crearPedido', () => {
    it('debería lanzar error cuando no hay suficiente stock', async () => {
      ProductoRepository.obtenerPorId.mockResolvedValue({
        _id: '1',
        nombre: 'Café Americano',
        stock: 5
      });

      const pedidoData = {
        items: [{ productoId: '1', cantidad: 10 }]
      };

      await expect(PedidoService.crearPedido(pedidoData))
        .rejects
        .toThrow('Stock insuficiente');
    });

    it('debería crear pedido cuando hay stock suficiente', async () => {
      ProductoRepository.obtenerPorId.mockResolvedValue({
        _id: '1',
        nombre: 'Café Americano',
        stock: 15
      });

      const pedidoData = {
        items: [{ productoId: '1', cantidad: 3 }]
      };

      const resultado = await PedidoService.crearPedido(pedidoData);
      expect(resultado).toHaveProperty('_id');
      expect(resultado.items).toHaveLength(1);
    });
  });
});
