<template>
    <ion-page>

      <ion-content class="content">
      
          <div class="centrado content">
            <div class="margen100" >
            <ion-img src="/usuario.png" class="header-image"></ion-img>
          </div>
         
          <div class="inputs">
              <ion-label >Username</ion-label>
                <ion-input class="item-inputs" v-model="username" fill="outline" placeholder="Ej: Admin"></ion-input>
                <ion-label>Password</ion-label>
                <ion-input class="item-inputs" v-model="password"   type="password" fill="outline" placeholder="Ej: ashnoias"></ion-input>
              </div>
          </div>
            <div class="centrado" style="margin-top: 20px;">
              <ion-button @click="login"  fill="solid">Login</ion-button>
            </div>
            <div class="margen100">
              <a style="text-decoration: none;" href=""> <p style="text-align: center;">Don’t have an account? Sing Up</p></a>
            </div>
            <footer>
          <ion-img src="/DLogin.png"></ion-img>
            </footer>
        </ion-content>
    </ion-page>
  </template>
  
  <script >
  import {IonPage,IonInput, IonButton, IonImg,IonContent} from '@ionic/vue';
  
  
  export default {
    name:'LoginComponente',
    components:{
      IonPage,
      IonInput, 
      IonButton, 
      IonImg,
      IonContent,
    },

    data() {
    return {
      username: '',
      password: '',
    };
  },
   methods:{
      async login() {

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
         
        alert('Inicio de sesión exitoso');
        this.$router.push("/tabs");
      } else {
        throw new Error('Contraseña incorrecta');
      }
    } catch (error) {
      alert(('Error al iniciar sesión:', error.message));
    }
  } else {
    console.error('Usuario y contraseña son obligatorios');
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
      justify-content: center;
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
    
   
  </style>