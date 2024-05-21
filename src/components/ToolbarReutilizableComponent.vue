<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
    </ion-header>
</template>

<script>
import {IonHeader, IonToolbar, IonTitle, IonProgressBar} from '@ionic/vue'
export default {
    name: 'ToolbarReutilizableComponent',
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonProgressBar,
    },
    props: {
        title: String
    }
}
</script>

