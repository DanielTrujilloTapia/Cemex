<template>
    <home-ad-component v-if="TypeUser==1"></home-ad-component> 
    <home-emp-ope-component v-if="TypeUser!=1"></home-emp-ope-component> 
</template>

<script>
import HomeAdComponent from '../components/HomeADComponent.vue';
import HomeEmpOpeComponent from '../components/HomeEMP_OPEComponent.vue';
export default {
     name: 'HomePage',
     inheritAttrs: false,
    components: {
      HomeAdComponent,
      HomeEmpOpeComponent
    },
    data() {
      return {  
        TypeUser:"",
      }
    },
    methods: {
      getNameUserLogin (){
        try {
          const User = localStorage.getItem('User-login');
          if (User) {
            const NameUser = JSON.parse(User);
            this.TypeUser= NameUser.idusucattipousuario; 
            console.log("Datos obtenidos correctamente");
          } else {
            console.log("Vuelvaa iniciar sesion para evitar cualquier error con la sesion iniciada");
          }   
        } catch {
          console.log("Hubo un error al obtener los datos de la sesion");
        }
      }
    },
    mounted() {
      this.getNameUserLogin();
    },
  }
</script>