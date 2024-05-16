<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ title }}</ion-card-title>
        <ion-card-subtitle>{{ subtitle }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <p><ion-icon :src="IconoUno"></ion-icon >{{ textUno }} </p>
        <p><ion-icon :src="IconoDos"></ion-icon>{{ textDos }} </p>
        
      </ion-card-content>
    </ion-card>
  </template>
  
  <script>
  import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/vue';
  
  export default {
    name: 'CardReutilizableComponent',
    props: {
      title: String,
      subtitle: String,
      textUno: String,
      textDos: String,
      IconoUno: String,
      IconoDos: String,
    },
    components: {
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardSubtitle,
      IonCardContent,
      IonIcon,
    },
  };
  </script>
  