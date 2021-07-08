# Transmision de video de un dispositivo a otro por medio de WebRTC

Aplicación de transmisión WebRTC PeerToPeer (punto a punto) que permite a la emisora enviar un flujo de audio y video a todos los usuarios conectados (observadores).
## Empezando
### Iniciando la aplicación
Para iniciar la aplicacion desde Node.Js:

```bash
# Install dependencies for server
npm install

# Run the server
node server
```

### Probando la Aplicación
Para el transmisior se debe ocupar la dirección:
>En el mismo equipo: https://localhost:4000/Transmitir
  En diferentes equipos:   https://[ip_servidor]:4000/Transmitir por ejemplo https://192.168.1.67:4000/Transmitir

Para el receptor se debe ocupar la dirección:
>En el mismo equipo: https://localhost:4000/Recibir
  En diferentes equipos:   https://[ip del servidor]:4000/Recibir por ejemplo https://192.168.1.67:4000/Recibir
