<template>
  <ion-page>
    <ion-header>
      <toolbar-reutilizable-component :title="'Escanear aditivos'"/>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <div>
            <p>Para comenzar a realizar las validaciones de los códigos QR has click en el boton scanner</p>
          </div>
        </ion-card-header>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <div class="cont-center">
            <div class="validacion">
              <ion-card-title style="color: white; text-align: center;">Validación de códigos</ion-card-title>
            </div>
          </div>
        </ion-card-header>
        <ion-card-content style="height: 200px;">
          <div style="max-height: 200px; overflow-y: auto;">
            <table style="width: 100%;">
              <thead>
                <tr>
                  <th style="background: none;"><ion-img src="/camion.png" class="iconos"></ion-img></th>
                  <th style="background: none;"><ion-img src="/tanque.png" class="iconos"></ion-img></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="index in Math.max(qrCodes.array1.length, qrCodes.array2.length)" :key="index - 1" :class="{ 'highlight': qrCodes.array2[index - 1] !== qrCodes.array1[index - 1], 'highlight-green': qrCodes.array2[index - 1] === qrCodes.array1[index - 1]}">
                <td class="center-text">
                    <p style="border-radius: 10px">{{ qrCodes.array1[index - 1] || '' }}</p>
                </td>
                <td class="center-text">{{ qrCodes.array2[index - 1] || '' }}</td>
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
            <p>
              Todos los datos utilizados en la aplicación están seguros y solo pueden acceder a ellos personal administrativo 
            </p>
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
    <ion-fab horizontal="end" vertical="bottom">
      <ion-fab-button @click="openDialog">
        <ion-icon :icon="qrCodeOutline"></ion-icon>
      </ion-fab-button>
      <ion-label>Scanner</ion-label>
    </ion-fab>
    <ion-modal :is-open="cameraModalOpen" @did-dismiss="closeCameraModal">
      <ion-page class="fondo">
        <div>
            <h1 class="titulo">Scan your code QR</h1>
            <div class="centrado">
                <div class="contenedor borde">
                 <qrcode-stream @detect="onDetect"></qrcode-stream>
              </div>
            </div>
        </div>
    </ion-page>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import { ref} from 'vue';
import { IonPage, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, IonFab, IonFabButton, IonHeader, IonLabel, IonModal,IonIcon } from '@ionic/vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import {qrCodeOutline} from 'ionicons/icons';
import ToolbarReutilizableComponent from '../components/ToolbarReutilizableComponent.vue'

const qrCodes = ref({ array1: [], array2: [] });
const dialogOpen = ref(false);
const cameraModalOpen = ref(false);
const selectedArray = ref('array1');
const ubicacion = ref(null);
const ubicacionDetallada = ref('');
let x=0;

const Userlogin = localStorage.getItem('User-login');
const Userid = JSON.parse(Userlogin);

const onDetect = (detectedCodes) => {
  detectedCodes.forEach(code => {
    qrCodes.value[selectedArray.value].push(code.rawValue);
  });
  localStorage.setItem('qrCodes', JSON.stringify(qrCodes.value));
  closeCameraModal();
  peticiones();
};

const openDialog = () => {
  dialogOpen.value = true;
};

const selectArray = (array) => {
  selectedArray.value = array === 1 ? 'array1' : 'array2';
  dialogOpen.value = false;
  openCameraModal();
};

const openCameraModal = () => {
  cameraModalOpen.value = true;
  obtenerUbicacion();
};

const closeCameraModal = () => {
  cameraModalOpen.value = false;
};

const vaciarArreglos = () => {
  qrCodes.value.array1 = [];
  qrCodes.value.array2 = [];
  localStorage.removeItem('qrCodes');
};

const cancelar = () => {
  dialogOpen.value = false;
};

// Método para obtener la ubicación actual
const obtenerUbicacion = async () => {
  try {
    const resp = await navigator.geolocation.getCurrentPosition(
      (position) => {
        ubicacion.value = position;
        obtenerUbicacionDetallada(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log('Error al obtener la ubicación', error, resp);
      }
    );
  } catch (error) {
   alert('Error al obtener la ubicación', error);
  }
};

// Método para obtener la ubicación detallada
const obtenerUbicacionDetallada = async (lat, lon) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await response.json();
    ubicacionDetallada.value = data.display_name;
  } catch (error) {
   alert('Error al obtener la ubicación detallada', error);
    ubicacionDetallada.value = 'Ubicación desconocida';
  }
};


//Fetch para Post Aditivos
let vali;

const peticiones = () => {
  for ( let i=0; i <qrCodes.value.array1.length; i++) {
    const elemento = qrCodes.value.array1[x];
    const elemento2 = qrCodes.value.array2[x];
    if(elemento==elemento2){
      vali="correcta";
    }else{
      vali="incorrecta";
    }
    
    if(qrCodes.value.array1[x]!=null && qrCodes.value.array2[x]!=null  ){
      x=x+1;
      
      try {
        const fecha2 = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
        const fecha2Objeto = new Date(fecha2);
        const desplazamiento = fecha2Objeto.getTimezoneOffset(); 
        const fecha2EnUTC = new Date(fecha2Objeto.getTime() - desplazamiento * 60000); 
        const fecha2ISO = fecha2EnUTC.toISOString(); 

        fetch('https://cemexapi20240515142245.azurewebsites.net/api/Cat_Aditivos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            
          },
          body: JSON.stringify({
            nom_aditivo: elemento,
            nom_contenedor: elemento2,
            descripcion_aditivo:'liquido',  
            validacion: vali,
            fecha: fecha2ISO,
            localizacion: ubicacionDetallada.value,
            id_usuusuario:Userid.id_usuario
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error en la solicitud');
            }
            alert("Almacenado correctamente en la base de datos");
          })
          .then(data => {
            console.log('Respuesta del servidor:', data); 
          })
          .catch(error => {
            alert('Error en la solicitud:', error); 
          });
      } catch (error) {
        alert('Error en la conexion a bd:', error); 
      }
    }
  }
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
  margin: 3px;
  border-width: 6px;
  border-style: solid;
  border-color: rgb(161, 163, 189);
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
