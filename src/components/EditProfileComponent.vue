<template>
    <ion-page>
      <ion-content>
        <div class="container-editpro">
          <div class="header-editpro">
            <ion-img src="IEdit.png" class="header-image-editpro"></ion-img>
            <ion-label class="text-editpro"><b>EDIT PROFILE</b></ion-label>
          </div>
        </div>
        <div class="container-editphoto">
          <ion-grid>
            <ion-row>
              <ion-col class="ion-text-center">
                <div class="photo-container">
                  <ion-img v-if="userPhoto" :src="userPhoto" class="photo-editpro" @click="selectAvatar"></ion-img>
                  <div v-else class="photo-placeholder" @click="selectPhoto"></div>
                  <div class="options">
                    <ion-item lines="none" @click="selectPhoto">
                    <ion-icon :icon="createOutline" color="primary"></ion-icon>
                    <ion-button size="small" fill="clear" @click="selectPhoto" :icon="createOutline">Editar</ion-button>
                    </ion-item>
                    <ion-item Lines="none" @click="deletePhoto">
                        <ion-icon :icon="trashOutline" color="primary"></ion-icon>
                    <ion-button size="small" fill="clear">Eliminar</ion-button>
                    </ion-item>
                  </div>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
        <!-- <div class="data">
            <ion-label>Usuario</ion-label>
            <ion-input  label-placement="floating" fill="outline" maxlength="15"></ion-input>
        </div> -->
        <ion-button class="center">Guardar</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonButton, IonAlert , IonItem,IonIcon , alertController} from '@ionic/vue';
  import { Camera, CameraResultType } from '@capacitor/camera';
  import {trashOutline, createOutline} from 'ionicons/icons';

  export default {
    name: 'SettingsComponent',
    components: {
      IonPage,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonImg,
      IonButton
    },
    setup(){
        return{
            trashOutline,
            createOutline
        }
    },
    data() {
      return {
        userPhoto: null
      };
    },
    methods: {
      async selectPhoto() {
        const alert = await alertController.create({
          header: 'Seleccionar imagen',
          buttons: [
            {
              text: 'Tomar foto',
              handler: () => {
                this.takePhoto();
              }
            },
            {
              text: 'Seleccionar de galería',
              handler: () => {
                this.pickPhoto();
              }
            }
          ]
        });
        await alert.present();
      },
      async takePhoto() {
        try {
          const capturedPhoto = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl
          });
          this.userPhoto = capturedPhoto.dataUrl;
        } catch (error) {
          console.error('Error al tomar la foto:', error);
        }
      },
      async pickPhoto() {
        try {
          const galleryPhotos = await Camera.pickImages({ limit: 1 });
          if (galleryPhotos.photos.length > 0) {
            this.userPhoto = galleryPhotos.photos[0].webPath;
          }
        } catch (error) {
          console.error('Error al seleccionar la imagen:', error);
        }
      },
      deletePhoto() {
        this.userPhoto = null;
      }
    }
  };
  </script>
  
  <style>
  .photo-editpro {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
  
  .photo-placeholder {
    width: 100px;
    height: 100px;
    background-color: rgb(236, 236, 236);
    cursor: pointer;
  }
  .container-editpro {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 130px;
    background: linear-gradient(to bottom, #BDD4DB, #FFFFFF);
    margin-bottom: 20px;
  }
  .container-editphoto{
    margin-left: 50px;
    margin-top: 30px;
  }
  
  .header-editpro {
    position: absolute;
    bottom: 0;
    left: 60px;
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }
  
  .header-image-editpro {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
  
  .text-editpro {
    font-size: 20px;
    color: #000;
  }
  
  .photo-container {
    position: relative;
  }
  
  .options {
    position: absolute;
    top: 0;
    right: 80px;
  }
  
  .photo-options ion-button {
    margin-left: 5px;
  }
  .center {
    align-items: center;
    margin-left: 150px;
    margin-top: 200px; 
  }
  .data{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  </style>
  