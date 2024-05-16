<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Boards USER and ADITIVOS</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    Tabla de usuarios
                </ion-col>
                <ion-col>
                    <ion-button>New User</ion-button>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>User</ion-col>
                <ion-col>Tipo</ion-col>
                <ion-col>Estado</ion-col>
                <ion-col>Acciones</ion-col>
            </ion-row>
            <!-- Verificar si usuarioTabla está vacío o no -->
            <ion-row v-if="usuarioTabla.length === 0">
                <ion-col>No hay usuarios para mostrar</ion-col>
            </ion-row>
            <!-- Utilizar v-if para verificar si usuarioTabla tiene datos antes de iterar -->
            <ion-row v-else v-for="usuario in usuarioTabla" :key="usuario.id_usuario">
                <ion-col>{{ usuario.nom_usuario }}</ion-col>
                <!-- Verificar si usuario.tipoUsuario existe antes de acceder a sus propiedades -->
                <ion-col>{{ usuario.tipoUsuario ? usuario.tipoUsuario.nom_tipo : 'N/A' }}</ion-col>
                <!-- Verificar si usuario.estadoUsuario existe antes de acceder a sus propiedades -->
                <ion-col>{{ usuario.estadoUsuario ? usuario.estadoUsuario.nom_estado : 'N/A' }}</ion-col>
                <ion-col>
                    <ion-button>Editar</ion-button>
                    <ion-button color="danger">Eliminar</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
export default {
    name: 'BoardComponent',
    components: {
      IonPage,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonButton,
      IonHeader,
      IonToolbar,
      IonTitle,

    },
    data() {
      return {
        usuarioTabla: [],
        tipoTabla: [],
        estadoTabla: []
      }
    },
    methods: {
      async ConsultasDatos() {
        try {
          // Obtén los datos de los usuarios
          const responseUsuarios = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Usuarios');
          this.usuarioTabla = await responseUsuarios.json();
          console.log(this.usuarioTabla);
          console.log("Consulta exitosa")
        } catch (error) {
          console.error("Error en la consulta de Usuarios:", error);
        }
  
        try {
          // Obtén los datos de los tipos
          const responseTipo = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Cat_Tipos_Usuarios');
          this.tipoTabla = await responseTipo.json();
          console.log(this.tipoTabla);
          console.log("Consulta exitosa")
        } catch (error) {
          console.error("Error en la consulta de Tipos de usuarios:", error);
        }
  
        try {
          // Obtén los datos de los estados
          const responseEstado = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Cat_Estados');
          this.estadoTabla = await responseEstado.json();
          console.log(this.estadoTabla);
          console.log("Consulta exitosa")
        } catch (error) {
          console.error("Error en la consulta de Estados de usuarios:", error);
        }
  
        // Hacer un inner join entre los datos de usuario, tipo y estado
        this.usuarioTabla = this.usuarioTabla.map(usuario => {
          usuario.tipoUsuario = this.tipoTabla.find(tipo => tipo.id_tipo === usuario.idusucattipousuario);
          usuario.estadoUsuario = this.estadoTabla.find(estado => estado.id_estado === usuario.idusucatestado);
          return usuario;
        });
      }
    },
    
    created() {
      this.ConsultasDatos();
    }
}
</script>