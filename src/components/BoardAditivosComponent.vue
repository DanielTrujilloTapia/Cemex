<template>
    <ion-page>
      <toolbar-reutilizable-component :title="'Aditivos'"/>
      <ion-content>
        <ion-card>
          <ion-grid>
            <ion-row>
                <ion-col>idusuusuario</ion-col>
                <ion-col>nom_aditivos</ion-col>
                <ion-col>nom_contenedor</ion-col>
                <ion-col>validacion</ion-col>
                <ion-col>fecha</ion-col>
                <ion-col>Localizacion</ion-col>
            </ion-row>
            <ion-row v-for="aditivo in this.aditivosTabla" :key="aditivo.id_aditivos">
                <ion-col>{{ aditivo.UsuarioDato ? aditivo.UsuarioDato.nom_usuario : 'N/A' }}</ion-col>
                <ion-col>{{ aditivo.nom_aditivo }}</ion-col>
                <ion-col>{{ aditivo.nom_contenedor }}</ion-col>
                <ion-col>{{ aditivo.validacion }}</ion-col>
                <ion-col>{{ aditivo.fecha }}</ion-col>
                <ion-col>{{ aditivo.localizacion }}</ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonContent, IonCard, IonGrid, IonCol, IonRow } from '@ionic/vue';
  
  import ToolbarReutilizableComponent from './ToolbarReutilizableComponent.vue';
  
  export default {
    name: 'BoardAditivosComponent',
    components: {
      IonPage,
      IonContent,
      IonCard,
      IonGrid, 
      IonCol, 
      IonRow,
      ToolbarReutilizableComponent
    },
    data (){
        return {
            aditivosTabla: [],
            usuarioTabla: [],
        }
    },
    methods: {
        async ConsultarAditivosVaciados() {
            try {
                const responseAditivos = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Cat_Aditivos');
                this.aditivosTabla = await responseAditivos.json();
                console.log("Consulta exitosa de aditivos");
                console.log(this.aditivosTabla);
            } catch (error) {
                console.error("Error en la consulta de los Aditivos:", error);
            }
  
            try {
                const responseUsuarios = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Usuarios');
                this.usuarioTabla = await responseUsuarios.json();
                console.log("Consulta exitosa de usuarios");
                console.log(this.usuarioTabla);
            } catch (error) {
                console.error("Error en la consulta de Usuarios:", error);
            }
  
            this.aditivosTabla = this.aditivosTabla.map(aditivo => {
                aditivo.UsuarioDato = this.usuarioTabla.find(usuario => usuario.id_usuario === aditivo.id_usuusuario);  
                return aditivo;
            });
        }
    },
    created() {
        this.ConsultarAditivosVaciados();
    },
  };
  </script>
  
  <style>
  </style>
  