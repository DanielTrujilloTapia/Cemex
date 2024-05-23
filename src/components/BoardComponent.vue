<template>
  <ion-page>
    <toolbar-reutilizable-component :title="'Usuarios'"/>
    <ion-content>
      <ion-card>
        <ion-grid>
          <ion-row>
            <ion-col size="7" class="pagination-text">
              <h3>Usuarios {{searchType}}</h3>
            </ion-col>
            <ion-col size="5" class="center-icon-addUser">
              <ion-button @click.prevent="redirectRegister">
                <ion-icon class="icon" :icon="personAddOutline"></ion-icon>
                usuario
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row style="margin-bottom: 15px;">
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
              <ion-select v-model="searchState" >
                <ion-select-option value="">Estado</ion-select-option>
                <ion-select-option v-for="estado in estadoTabla" :key="estado.id_estado" :value="estado.nom_estado">
                  {{ estado.nom_estado }}
                </ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>
          <ion-row >  
            <ion-col class="pagination-text">User</ion-col>
            <ion-col class="pagination-text">Tipo</ion-col>
            <ion-col class="pagination-text">Estado</ion-col>
            <ion-col class="pagination-text">Acciones</ion-col>
          </ion-row>
          <!-- Verificar si usuarioTabla está vacío o no -->
          <ion-row v-if="paginatedUsers.length === 0">
            <ion-col>No hay usuarios para mostrar</ion-col>
          </ion-row>
          <!-- Utilizar v-if para verificar si usuarioTabla tiene datos antes de iterar -->
          <ion-row v-else v-for="usuario in paginatedUsers" :key="usuario.id_usuario" class="table-row table-space " >
            <ion-col class="pagination-text">{{ usuario.nom_usuario }}</ion-col>
            <ion-col class="pagination-text">{{ usuario.tipoUsuario ? usuario.tipoUsuario.nom_tipo : 'N/A' }}</ion-col>
            <ion-col class="pagination-text">{{ usuario.estadoUsuario ? usuario.estadoUsuario.nom_estado : 'N/A' }}</ion-col>
            <ion-col class="pagination-text">
              <ion-icon :icon="createOutline" class="Icon" color="primary" @click.prevent="handleEditClick(usuario.id_usuario), redirectEditAccount"></ion-icon>
              <ion-icon :icon="trashOutline" class="Icon" color="danger" @click.prevent="DeleteGetId(usuario.id_usuario)"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-row class="pagination-row">
          <ion-col class="pagination-icon">
            <ion-icon class="icon" color="primary" :icon="chevronBackOutline" @click.prevent="prevPage" :disabled="currentPage === 1"></ion-icon>
          </ion-col>
          <ion-col size="auto" class="pagination-text">
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
          </ion-col>
          <ion-col class="pagination-icon">
            <ion-icon class="icon" color="primary" :icon="chevronForwardOutline" @click.prevent="nextPage" :disabled="currentPage === totalPages"></ion-icon>
          </ion-col>
        </ion-row>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonGrid, IonRow, IonCol, IonInput, IonSelect, IonSelectOption, IonIcon, IonButton } from '@ionic/vue';
import { createOutline, trashOutline, chevronBackOutline, chevronForwardOutline, personAddOutline} from 'ionicons/icons';
import ToolbarReutilizableComponent from '../components/ToolbarReutilizableComponent.vue';

import { useRouter } from 'vue-router';
export default {
  name: 'BoardComponent',
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonButton,
    ToolbarReutilizableComponent
  },
  setup() {
    
      const router = useRouter();
      
      const redirectRegister = () => {
        router.push('/register');
      }

      const handleEditClick = (id_usuario) => {
        localStorage.setItem('id-user-edit', JSON.stringify(id_usuario)); 
        console.log('id enviada', id_usuario);
        router.push('/editaccount');
    }

    return {
      createOutline,
      trashOutline,
      chevronForwardOutline,
      chevronBackOutline,
      personAddOutline,
      redirectRegister,
      handleEditClick
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
      itemsPerPage: 5,
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
        console.log("Consulta exitosa");
      } catch (error) {
        console.error("Error en la consulta de Usuarios:", error);
      }

      try {
        const responseTipo = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Cat_Tipos_Usuarios');
        this.tipoTabla = await responseTipo.json();
        console.log("Consulta exitosa");
      } catch (error) {
        console.error("Error en la consulta de Tipos de usuarios:", error);
      }

      try {
        const responseEstado = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Cat_Estados');
        this.estadoTabla = await responseEstado.json();
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
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    
    

    async DeleteGetId(id_user) {
      try {
        await fetch(`https://cemexapi20240515142245.azurewebsites.net/api/Usu_Usuarios?id=${id_user}`, {
        method: 'DELETE'
        });
        console.log('Usuario eliminado correctamente', id_user)
        this.ConsultasDatos();
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }

      
    },

  },
  created() {
    this.ConsultasDatos();
  }
};
</script>


<style>
.center-icon-addUser {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Icon{
  margin-left: 5px;
  margin-right: 5px;
  width: 20px;
  height: 20px; 
}

/* Centrando los íconos de paginación y el texto */
.pagination-row {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 10px;
}

.pagination-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 15px;
  height: 15px; 
  margin-right: 5px;
} 

.pagination-text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-space {
  margin: 25px 0;
}
</style>