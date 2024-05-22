<template>
    <ion-page>

      <ion-content>
          <div class="centrado content">
              <div class="margen100" >
                <ion-img src="/usuario.png" class="header-image"></ion-img>
            </div>
          
            <div class="inputs">
                <ion-label >Username</ion-label>
                  <ion-input class="item-inputs" v-model="username" fill="outline" placeholder="Ej: Admin"></ion-input>
                  <ion-label>Password</ion-label>
                  <ion-input class="item-inputs" v-model="password"   type="password" fill="outline" placeholder="Ej: ashnoias">
                    <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                  </ion-input>
            </div>
            <div style="margin: 20px;">
              <ion-button id="open-loading" @click="login" fill="solid">Login</ion-button>
              <ion-loading :is-open="loading" message="Cargando..." spinner="circles"></ion-loading>
            </div>
            <div style="margin-top: 70px;">
              <a style="text-decoration: none;" href="">Cemex</a>
            </div>

        <footer class="footer">
          <div class="imagefooter">
              <img src="/DLogin.png" alt="Descripción de la imagen" class="full-width-image">
          </div>
      </footer>
          </div>
        </ion-content>
    </ion-page>
  </template>
  
  <script >
  import {IonPage,IonInput, IonButton, IonImg,IonContent, IonLabel, IonInputPasswordToggle, IonLoading} from '@ionic/vue';
  
  
  export default {
    name:'LoginComponente',
    components:{
      IonPage,
      IonInput, 
      IonButton, 
      IonImg,
      IonContent,
      IonLabel,
      IonInputPasswordToggle,
      IonLoading
    },

    data() {
    return {
      username: '',
      password: '',
      loading: false
    };
  },
   methods:{
      async login() {
        this.loading = true; 
  if (this.username !== '' && this.password !== '') {
    try {
      const response = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Usuarios');
      const users = await response.json();

      const userToLogin = users.find(user => user.nom_usuario === this.username);

      if (!userToLogin) {
        console.log(response);
        throw new Error('Usuario no encontrado');
      }

      if (userToLogin.contrasena === this.password) {
        localStorage.setItem('User-login', JSON.stringify(userToLogin)); 
        this.loading = false;
        alert('Inicio de sesión exitoso');
        this.$router.push("/tabs");
      } else {
        throw new Error('Contraseña incorrecta');
      }
    } catch (error) {
      this.loading = false;
      alert(('Error al iniciar sesión:', error.message));
    }
  } else {
    this.loading = false; 
    alert('Usuario y contraseña son obligatorios');
  }
},

}
}
  
  </script>
  
  <style>
    .header-image{
      width: 100px;
      height: 100px;
    }
    .inputs{
      margin-top: 50px;
    }
    .centrado{
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .espacio-input{
      max-width: 300px;
    }
    .margen100{
      margin-top: 100px;
    }
    .item-inputs{
      margin-top: 20px;
      margin-bottom: 20px;
    }
   
    .content{
      position: relative;
      min-height: 100vh;
      padding-bottom: 80px;
    }
    .footer {
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0;
    overflow: hidden;        /* Oculta cualquier contenido desbordado */
}

.imagefooter {
    width: 100%;
    height: 100%;
}

.full-width-image {
    width: 100%;             /* Hace que la imagen ocupe el 100% del ancho del contenedor */
    height: 80px;            /* Mantiene las proporciones de la imagen */
}

   
  </style>