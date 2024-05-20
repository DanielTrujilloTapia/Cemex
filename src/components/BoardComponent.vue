<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Boards USER and ADITIVOS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-grid>
          <ion-row>
            <ion-col>
              <h2>Tabla de usuarios</h2>
            </ion-col>
            <ion-col size="auto">
              <ion-button @click="addNewUser">New User</ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="5">
              <ion-input placeholder="Username" v-model="searchName"></ion-input>
            </ion-col>
            <ion-col>
              <ion-select v-model="searchType">
                <ion-select-option value="">Tipo</ion-select-option>
                <ion-select-option v-for="tipo in tipoTabla" :key="tipo.id_tipo" :value="tipo.nom_tipo">
                  {{ tipo.nom_tipo }}
                </ion-select-option>
              </ion-select>
            </ion-col>
            <ion-col>
              <ion-select v-model="searchState">
                <ion-select-option value="">Estado</ion-select-option>
                <ion-select-option v-for="estado in estadoTabla" :key="estado.id_estado" :value="estado.nom_estado">
                  {{ estado.nom_estado }}
                </ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>
          <ion-row class="table-header">
            <ion-col>User</ion-col>
            <ion-col>Tipo</ion-col>
            <ion-col>Estado</ion-col>
            <ion-col>Acciones</ion-col>
          </ion-row>
          <!-- Verificar si usuarioTabla está vacío o no -->
          <ion-row v-if="paginatedUsers.length === 0">
            <ion-col>No hay usuarios para mostrar</ion-col>
          </ion-row>
          <!-- Utilizar v-if para verificar si usuarioTabla tiene datos antes de iterar -->
          <ion-row v-else v-for="usuario in paginatedUsers" :key="usuario.id_usuario" class="table-row">
            <ion-col>{{ usuario.nom_usuario }}</ion-col>
            <ion-col>{{ usuario.tipoUsuario ? usuario.tipoUsuario.nom_tipo : 'N/A' }}</ion-col>
            <ion-col>{{ usuario.estadoUsuario ? usuario.estadoUsuario.nom_estado : 'N/A' }}</ion-col>
            <ion-col>
              <ion-icon :icon="createOutline" class="Icon" color="primary"></ion-icon>
              <ion-icon :icon="trashOutline" class="Icon" color=""></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-row>
          <ion-col size="auto">
            <ion-icon color="primary" :icon="chevronBackOutline" @click="prevPage" :disabled="currentPage === 1"></ion-icon>
          </ion-col>
          <ion-col size="auto">
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
          </ion-col>
          <ion-col size="auto">
            <ion-icon color="primary" :icon="chevronForwardOutline" @click="nextPage" :disabled="currentPage === totalPages"></ion-icon>
          </ion-col>
        </ion-row>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonGrid, IonRow, IonCol, IonButton, IonHeader, IonToolbar, IonTitle, IonInput, IonSelect, IonSelectOption, IonIcon } from '@ionic/vue';
import { createOutline, trashOutline, chevronBackOutline, chevronForwardOutline} from 'ionicons/icons';

export default {
  name: 'BoardComponent',
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonIcon
  },
  setup() {
    return {
      createOutline,
      trashOutline,
      chevronForwardOutline,
      chevronBackOutline
    };
  },
  data() {
    return {
      usuarioTabla: [],
      tipoTabla: [],
      estadoTabla: [],
      searchName: '',
      searchType: '',
      searchState: '',
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    filteredUsers() {
      return this.usuarioTabla.filter(usuario => {
        const matchesName = this.searchName ? usuario.nom_usuario.toLowerCase().includes(this.searchName.toLowerCase()) : true;
        const matchesType = this.searchType ? (usuario.tipoUsuario && usuario.tipoUsuario.nom_tipo === this.searchType) : true;
        const matchesState = this.searchState ? (usuario.estadoUsuario && usuario.estadoUsuario.nom_estado === this.searchState) : true;
        return matchesName && matchesType && matchesState;
      });
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUsers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    }
  },
  methods: {
    async ConsultasDatos() {
      try {
        const responseUsuarios = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Usuarios');
        this.usuarioTabla = await responseUsuarios.json();
        console.log(this.usuarioTabla);
        console.log("Consulta exitosa");
      } catch (error) {
        console.error("Error en la consulta de Usuarios:", error);
      }

      try {
        const responseTipo = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Cat_Tipos_Usuarios');
        this.tipoTabla = await responseTipo.json();
        console.log(this.tipoTabla);
        console.log("Consulta exitosa");
      } catch (error) {
        console.error("Error en la consulta de Tipos de usuarios:", error);
      }

      try {
        const responseEstado = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Cat_Estados');
        this.estadoTabla = await responseEstado.json();
        console.log(this.estadoTabla);
        console.log("Consulta exitosa");
      } catch (error) {
        console.error("Error en la consulta de Estados de usuarios:", error);
      }

      this.usuarioTabla = this.usuarioTabla.map(usuario => {
        usuario.tipoUsuario = this.tipoTabla.find(tipo => tipo.id_tipo === usuario.idusucattipousuario);
        usuario.estadoUsuario = this.estadoTabla.find(estado => estado.id_estado === usuario.idusucatestado);
        return usuario;
      });
    },
    addNewUser() {
      // Lógica para agregar un nuevo usuario
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  created() {
    this.ConsultasDatos();
  }
};
</script>


<style>
.Icon{
  margin-left: 5px;
  margin-right: 5px;
}
</style>