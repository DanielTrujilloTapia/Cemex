<template>
    <ion-page class="horizontal-view">
        <toolbar-reutilizable-component :title="'Aditivos'"/>
        <ion-content>
            <div class="content">
                <h2>Contenido en modo horizontal</h2>
            </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonContent } from '@ionic/vue';
  import { ScreenOrientation } from '@capacitor/screen-orientation';
  import ToolbarReutilizableComponent from './ToolbarReutilizableComponent.vue';
  
  export default {
    name: 'BoardAditivosComponent',
    components: {
      IonPage,
      IonContent,
      ToolbarReutilizableComponent
    },
    async mounted() {
      try {
        if (typeof ScreenOrientation.lock !== 'undefined') {
          // Bloquear la orientación en modo landscape al montar el componente
          await ScreenOrientation.lock({ orientation: 'landscape' });
        } else {
          throw new Error('ScreenOrientation API not available');
        }
      } catch (err) {
        console.error("Error locking orientation:", err);
        alert("La API de orientación de pantalla no está disponible en este navegador.");
      }
    },
    beforeUnmount() {
      try {
        // Desbloquear la orientación al desmontar el componente
        ScreenOrientation.unlock();
      } catch (err) {
        console.error("Error unlocking orientation:", err);
      }
    },
  };
  </script>
  
  <style scoped>
  .horizontal-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  
  @media (orientation: portrait) {
    .horizontal-view {
      display: none;
    }
  }
  </style>
  