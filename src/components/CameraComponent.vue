<template>
    <ion-page class="fondo">
        <div>
            <h1 class="titulo">Scan your code QR</h1>
            <div class="centrado">
                <div v-if="cameraActive" class="contenedor">
          <qrcode-stream @detect="onDetect"></qrcode-stream>
        </div>
            </div>
        </div>
        
    </ion-page>
</template>

<script setup>
import {IonPage} from '@ionic/vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const cameraActive = ref(true);
const qrCodes = ref({ array1: [], array2: [] });
const router = useRouter();
const selectedArrayId = ref('');

selectedArrayId.value = localStorage.getItem('selectedArrayId') || '';

const onDetect = (detectedCodes) => {
    detectedCodes.forEach(code => {
        const selectedArray = selectedArrayId.value === 'array1' ? 'array1' : 'array2';
        qrCodes.value[selectedArray].push(code.rawValue);
    });
    // Cerrar la cámara después de detectar un código QR
    cameraActive.value = false;
    // Guardar qrCodes en localStorage
    localStorage.setItem('qrCodes', JSON.stringify(qrCodes.value));
    router.push('/tabs/tab2');
};



</script>

<style>
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