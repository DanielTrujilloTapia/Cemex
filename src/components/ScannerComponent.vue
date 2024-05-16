<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Escánear aditivos </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-header>
            <div>
        <div >
          <p>Para comenzar a realizar las validaciones de los códigos QR has click en el boton scanner</p>
        </div>
      </div>
      </ion-card-header>
      </ion-card>
      <div v-if="cameraActive" class="contenedor">
          <qrcode-stream @detect="onDetect"></qrcode-stream>
        </div>
  <ion-card>
    <ion-card-header>
      <div class="cont-center">
        <div class="validacion">
          <ion-card-title style="color: white; text-align: center;">Validación de códigos</ion-card-title>
        </div>
      </div>
    </ion-card-header>
    <ion-card-content>
      <div style="max-height: 200px; overflow-y: auto;">
      <table style="width: 100%;">
        <thead>
          <tr>
            <th><ion-img src="/camion.png" class="iconos"></ion-img></th>
            <th><ion-img src="/tanque.png" class="iconos"></ion-img></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in qrCodes.array1" :key="index" :class="{ 'highlight': qrCodes.array2[index] !== item, 'highlight-green': qrCodes.array2[index] === item}">
            <td class="center-text"><p style="border-radius: 10px">{{ item }}</p></td>
            <td class="center-text">{{ qrCodes.array2[index] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </ion-card-content>
  </ion-card>
        <div>
        <ion-button class="centered-button" @click="vaciarArreglos">Delete</ion-button>
      </div>
      <ion-card style="margin-top: 80px;">
          <ion-card-header>
            <div>
        <div >
          <p>
            Todos los datos utilizados en la aplicación esta seguros y solo pueden acceder a ellos personal administrativo 
          </p>
        </div>
      </div>
      </ion-card-header>
      </ion-card>
      </ion-content>
      
      <div v-if="dialogOpen" class="custom-dialog">
          <div class="dialog-content">
            <h4>Selecciona la parte a escanear</h4>
            <div class="iconos-container">
              
              <ion-img src="/camion.png" class="iconos" @click="selectArray(1)"></ion-img>
              <ion-img src="/tanque.png" class="iconos" @click="selectArray(2)"></ion-img>
            </div>
                <div>
                    <ion-button class="centered-button" @click="cancelar">Cancelar</ion-button>
                </div>
          </div>
        </div>
        <ion-fab  horizontal="end" vertical="bottom">
      <ion-fab-button @click="openDialog">
        <ion-img src="/codigo-qr(1).png" class="iconos"></ion-img>
      </ion-fab-button>
      <ion-label>Scanner</ion-label>
    </ion-fab>


    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { IonPage, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg,IonFab, IonFabButton,IonHeader,IonToolbar,IonTitle, IonLabel} from '@ionic/vue';
  import { QrcodeStream } from 'vue-qrcode-reader';
  
  

  const qrCodes = ref({ array1: [], array2: [] });
  const cameraActive = ref(false);
  const dialogOpen = ref(false);
  const selectedArray = ref('array1');
  

  //const Userlogin = localStorage.getItem('User-login');
  const onDetect = (detectedCodes) => {
    detectedCodes.forEach(code => {
      qrCodes.value[selectedArray.value].push(code.rawValue);
    });
    // Cerrar la cámara después de detectar un código QR
    cameraActive.value = false;
   // peticiones();
  };
  
  const openDialog = () => {
    dialogOpen.value = true;
  };

  const selectArray = (array) => {
  selectedArray.value = array === 1 ? 'array1' : 'array2';
  dialogOpen.value = false;
  // Abrir la cámara al seleccionar un array
  cameraActive.value = true;
};
  
  const vaciarArreglos = () => {
    qrCodes.value.array1 = [];
    qrCodes.value.array2 = [];
  };
 
  const cancelar = () => {
    dialogOpen.value = false;
  };
 

 
 
  </script>
  
  <style>
  .custom-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
  }
  
  .container-camara {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    max-width: 400px;
    max-height: 400px;
    margin: 0 auto;
    padding-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 5px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .highlight {
    background-color: #FBC1C1;
    text-align: center;
    color: black;
  }
  .highlight-green{
    background-color: #A9D1F6;
    text-align: center;
    color: black;
  }
  .iconos {
    width: 40px;
    margin: 0 auto;
  }
  
  .iconos-container {
    display: flex;
    flex-direction: row;
  }
  
  .center-text {
    text-align: center;
  }
  
  .imagenQR{
    width: 300px;
    margin: 20px auto 0;
  }
  
  .centered-button {
    display: block;
    margin: 20px auto 0;
    width: 100px;
  }
  .content{
    margin-top: 100px;
  }
  .validacion{
    border-radius: 10px;
    background-color: #DF343D;
    width: 230px;
  }
  .cont-center{
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .borde{
    border-width: 1px;
    border-style: solid;
    border-color: black;
  }


  .fondo {
  background: linear-gradient(0deg, #D1E1E6, #FFFFFF);
}
.contenedor{
    width: 250px;
    height: 250px;
    margin-top: 150px;
}
.centrado{
    display: flex;
    justify-content: center;
}
.titulo{
    margin-top: 100px;
    text-align: center;
}
  </style>