<template>
    <ion-page>
      <ion-content>
        <ion-card style="height: auto;">
          <ion-card-header>
            <ion-card-title>Bienvenido Administrador Aldair</ion-card-title>
            <ion-card-subtitle>Que le gustaria hacer el dia de hoy?</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-img src="/Cemex_log.png"></ion-img>
          </ion-card-content>
        </ion-card>
        <card-reutilizable-component :title="titleCard1" :subtitle="subtitleCard1" :textUno="textUnoCard1" :textDos="textDosCard1" :IconoUno="'/person-add-outline.svg'" :IconoDos="'/list-outline.svg'"/>
        <card-reutilizable-component :title="titleCard2" :subtitle="subtitleCard2" :textUno="textUnoCard2" :IconoUno="'/person-add-outline.svg'"/>
        <card-reutilizable-component :title="titleCard3" :subtitle="subtitleCard3" :textUno="textUnoCard3" :textDos="textDosCard3" :IconoUno="'/lock-closed-outline.svg'" :IconoDos="'call-outline.svg'"/>

      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonImg} from '@ionic/vue';
  import CardReutilizableComponent from '../components/CardReutilizableComponent.vue'
  export default {
    name: 'HomeAdComponent',
    components: {
      IonPage,
      IonContent,
      IonCard,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle, 
      IonCardContent,
      IonImg,
      CardReutilizableComponent
    },
    data() {
      return {
        titleCard1: "Manejo y administracion de usuarios",
        subtitleCard1: "Esta herramienta nos permite administrar mejor la informacion de nuestros usuarios",
        textUnoCard1: "   Crear nueva cuenta?",
        textDosCard1: "   Consultar usuarios existentes?",

        titleCard2: "Consultar aditivos vaciados o contenedores",
        subtitleCard2: "Consultas sobre aditivos vaciados en contenedores",
        textUnoCard2: "   Consultar aditivos vaciados?",
        
        titleCard3: "Gestionar cuenta",
        subtitleCard3: "Administra tu informacion y datos personales para un mejor inicio de sesion",
        textUnoCard3: "   Cambiar Contraseña?",
        textDosCard3: "   Agregar numero de telefono?"
      }
    }
    

  }
  </script>
  