<template>
    <ion-page>
        <ion-content>
        <div class="container">
            <ion-img src="/DRegister.png" class="image"></ion-img>
            <ion-label class="register"><b>REGISTRO</b></ion-label>
            <div class="separation">
                    <ion-label>Usuario</ion-label>
                    <ion-input v-model="username" label-placement="floating" fill="outline" class="spacing" maxlength="15"></ion-input>
                    <ion-label>Contraseña</ion-label>
                    <ion-input v-model="password" label-placement="floating" fill="outline" type="password" class="spacing" maxlength="8" pattern="[a-zA-Z0-9]+">
                    <ion-input-password-toggle slot="end"></ion-input-password-toggle></ion-input>
                    <ion-label>Estado</ion-label>
                    <ion-item class="spacing">
                    <ion-select v-model="selectedState"  placeholder="Activo" class="ion-select-fixed">
                        <ion-select-option value="1">Activo</ion-select-option>
                        <ion-select-option value="2">Inactivo</ion-select-option>
                        <ion-select-option value="3">Suspendido</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-label>Tipo</ion-label>
                <ion-item class="spacing">

                    <ion-select aria-label="Tipo Usuario" v-model="selectedType" placeholder="Administrador" class="ion-select-fixed">
                        <ion-select-option value="1">Administrador</ion-select-option>
                        <ion-select-option value="2">Empleado</ion-select-option>
                        <ion-select-option value="3">Operador</ion-select-option>
                    </ion-select>
                </ion-item>
            </div>

            <ion-button @click="register" fill="solid" style="margin-top:50px; margin-bottom:50px">Registrar</ion-button>
        </div>
    </ion-content>
    </ion-page>
</template>

<script>
import { IonImg, IonPage, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonContent, IonLabel , IonInputPasswordToggle } from '@ionic/vue';

export default {
    name: 'RegisterComponent',
    components: {
        IonPage,
        IonImg,
        IonItem,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonButton,
        IonContent,
        IonLabel,
        IonInputPasswordToggle
    },
    data() {
        return {
            username: '',
            password: '',
            selectedState: '',
            selectedType: ''
        };
    },
    methods: {
        async register() {
            if (this.username !== '' && this.password !== '' && this.selectedState !== '' && this.selectedType !== '') {
                try {
            const checkUser = await fetch(`https://cemexapi20240515142245.azurewebsites.net/api/Usu_Usuarios?nom_usuario=${this.username}`);
            const existingUsers = await checkUser.json();

            const userWithName = existingUsers.find(user => user.nom_usuario === this.username);

            if (userWithName) {
                alert('Ya existe un usuario con el mismo nombre, elige otro nombre de usuario');
                return;
            }
                    const response = await fetch('https://cemexapi20240515142245.azurewebsites.net/api/Usu_Usuarios', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id_usuario: 0,
                            nom_usuario: this.username,
                            contrasena: this.password,
                            idusucatestado: parseInt(this.selectedState),
                            idusucattipousuario: parseInt(this.selectedType)
                        })
                    });
                    if (response.ok) {
                        alert ('Registro exitoso');
                    } else {
                        console.error('Error en el registro:');
                    }
                } catch (error) {
                    alert(('Error en el registro:', error));
                }
            } else {
                alert('Todos los campos son obligatorios');
            }
        }
    }
}
</script>



<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.separation{
    margin-top: 50px;
}

.image {
    width: 100%;
}

.register {
    margin-top: 25px;
    font-size: 1.5em;
    text-align: left;
}
.spacing{
    margin-bottom: 25px;
    margin-top: 20px;
}
.spacing ion-label {
    margin-bottom: 10px;
}

.spacing ion-select::part(icon) {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
}
</style>
