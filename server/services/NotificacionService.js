class NotificacionService {
  constructor() {
    this.observadores = [];
  }

  suscribir(observador) {
    this.observadores.push(observador);
  }

  notificar(evento, datos) {
    this.observadores.forEach(obs => {
      if (obs.eventos.includes(evento)) {
        obs.ejecutar(datos);
      }
    });
  }
}

// Implementaciones concretas
class EmailNotificador {
  constructor() {
    this.eventos = ['pedido_creado', 'pedido_completado'];
  }

  ejecutar(datos) {
    console.log(`Enviando email sobre ${datos.tipoEvento} a ${datos.cliente.email}`);
    // Lógica real de envío de email
  }
}

// Uso
const notificacionService = new NotificacionService();
notificacionService.suscribir(new EmailNotificador());

// Cuando ocurre un evento:
notificacionService.notificar('pedido_creado', {
  tipoEvento: 'pedido_creado',
  cliente: { email: 'cliente@example.com' },
  pedidoId: '12345'
});
