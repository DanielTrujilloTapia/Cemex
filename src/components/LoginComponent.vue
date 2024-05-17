<template>
    <ion-page>
      <div>
            <div class="centrado margen100" >
            <ion-img src="/usuario.png" class="header-image"></ion-img>
          </div>
          
          <div class="centrado">
            <ion-list>
              <ion-item class="inputs">  
                <ion-input class="espacio-input" v-model="username" label="Username" label-placement="floating"  fill="outline" placeholder="Nombre de usuario"></ion-input>
              </ion-item>
              <ion-item class="inputs">
                <ion-input class="espacio-input" v-model="password" label="Password" label-placement="floating"  fill="outline" type="password" placeholder="contraseña"></ion-input>
              </ion-item>
            </ion-list>
        </div>
            <div class="centrado" style="margin-top: 20px;">
              <ion-button @click="login"  fill="solid">Login</ion-button>
            </div>
            <div class="margen100">
              <a style="text-decoration: none;" href=""> <p style="text-align: center;">Don’t have an account? Sing Up</p></a>
            </div>
           
      </div>
    </ion-page>
  </template>
  
  <script >
  import {IonPage, IonItem, IonList, IonInput, IonButton, IonImg} from '@ionic/vue';
  
  
  export default {
    name:'LoginComponente',
    components:{
      IonPage,
      IonItem, 
      IonList, 
      IonInput, 
      IonButton, 
      IonImg,
    
    },
    data() {
    return {
      username: '',
      password: '',
    };
  },
   methods:{
      async login() {
  console.log(this.username);
  console.log(this.password);

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
      width: 132px;
      height: 131px;
    }
    .inputs{
      margin-top: 50px;
    }
    .centrado{
      display: flex;
      justify-content: center;
    }
    .espacio-input{
      max-width: 300px;
    }
    .margen100{
      margin-top: 100px;
    }
   
  </style>