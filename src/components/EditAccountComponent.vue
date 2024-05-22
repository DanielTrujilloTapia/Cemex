<template>
    <ion-page>
        <ion-content>
        <div class="container-header">
            <div class="header">
            <ion-img src="/edit-account.png" class="header-image"></ion-img>
            <ion-label class="register"><b>EDITAR CUENTA</b></ion-label>
        </div>
        </div>
        <div class="container">
            <div class="separation">
                    <ion-label>Usuario</ion-label>
                    <ion-input v-model="username" label-placement="floating" fill="outline" class="spacing" maxlength="10"></ion-input>
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

            <ion-button @click="edit" fill="solid" style="margin-top:50px; margin-bottom:50px">Editar</ion-button>
        </div>
    </ion-content>
    </ion-page>
</template>

<script>
import { IonImg, IonPage, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonContent, IonLabel , IonInputPasswordToggle } from '@ionic/vue';

export default {
    name: 'EditAccountComponent',
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
        async edit() {
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
.container-header {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100%;
    height: 130px;
}
.header {
    position: absolute;
    bottom: 0;
    left: 60px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.header-image {
    width: 50px;
    height: 50px;
    margin-right: 15px;
}
.separation{
    margin-top: 50px;
}

.image {
    width: 10%;
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
