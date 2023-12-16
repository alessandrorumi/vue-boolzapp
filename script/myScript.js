const { DateTime } = luxon;

const { createApp } = Vue;

createApp({

  data() {

    return {

        // Elemento visualizzato in quel momento
        activeItem: 0,
        // Colore del contatto relativo alla chat corrispondente
        activeColor: 0,
        // Oggetto messaggio inviato da "me"
        userMessage: {message: '', status: 'sent'},
        // Ricerca utenti input text contatti
        search: '',
        // Errore che certifica se l'utente non inserisce nulla o inserisce solo spazi nell'input messaggio
        error: false,

        settingActive: false,
        activeMessageIndex: null,

        contacts: [
          {
              name: 'Michele',
              avatar: 'img/avatar-boolzap/avatar_1.jpg',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Hai portato a spasso il cane?',
                      status: 'sent'
                      
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Ricordati di stendere i panni',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 16:15:22',
                      message: 'Tutto fatto!',
                      status: 'received',
                  }
              ],
          },
          {
              name: 'Fabio',
              avatar: 'img/avatar-boolzap/avatar_2.jpg',
              visible: true,
              messages: [
                  {
                      date: '20/03/2020 16:30:00',
                      message: 'Ciao come stai?',
                      status: 'sent'
                  },
                  {
                      date: '20/03/2020 16:30:55',
                      message: 'Bene grazie! Stasera ci vediamo?',
                      status: 'received'
                  },
                  {
                      date: '20/03/2020 16:35:00',
                      message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                      status: 'sent'
                  }
              ],
          },
          {
              name: 'Samuele',
              avatar: 'img/avatar-boolzap/avatar_3.jpg',
              visible: true,
              messages: [
                  {
                      date: '28/03/2020 10:10:40',
                      message: 'La Marianna va in campagna',
                      status: 'received'
                  },
                  {
                      date: '28/03/2020 10:20:10',
                      message: 'Sicuro di non aver sbagliato chat?',
                      status: 'sent'
                  },
                  {
                      date: '28/03/2020 16:15:22',
                      message: 'Ah scusa!',
                      status: 'received'
                  }
              ],
          },
          {
              name: 'Alessandro B.',
              avatar: 'img/avatar-boolzap/avatar_4.jpg',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Lo sai che ha aperto una nuova pizzeria?',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Si, ma preferirei andare al cinema',
                      status: 'received'
                  }
              ],
          },
          {
              name: 'Alessandro L.',
              avatar: 'img/avatar-boolzap/avatar_5.jpg',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Ricordati di chiamare la nonna',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Va bene, stasera la sento',
                      status: 'received'
                  }
              ],
          },
          {
              name: 'Claudia',
              avatar: 'img/avatar-boolzap/avatar_6.jpg',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Ciao Claudia, hai novità?',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Non ancora',
                      status: 'received'
                  },
                  {
                      date: '10/01/2020 15:51:00',
                      message: 'Nessuna nuova, buona nuova',
                      status: 'sent'
                  }
              ],
          },
          {
              name: 'Federico',
              avatar: 'img/avatar-boolzap/avatar_7.jpg',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Fai gli auguri a Martina che è il suo compleanno!',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Grazie per avermelo ricordato, le scrivo subito!',
                      status: 'received'
                  }
              ],
          },
          {
              name: 'Davide',
              avatar: 'img/avatar-boolzap/avatar_8.jpg',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Ciao, andiamo a mangiare la pizza stasera?',
                      status: 'received'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:51:00',
                      message: 'OK!!',
                      status: 'received'
                  }
              ],
          }
      ]
    
    }

  },

  methods: {

    // Mostra la conversazione relativa (al click del mouse sulla chat)
    showConversation(i) {
      // console.log(`Click effettuato sul contatto n° ${i + 1}`);
      this.activeItem = i;
      this.activeColor = i;
    },

    // Aggiungi messaggio
    addMsg(activeItem) {
      // Verifica se il messaggio non è vuoto o composto solo da spazi
      this.spaces = this.userMessage.message.trim() === "";
      if (this.userMessage.message.length < 1 || this.spaces) {
          this.error = true;
        } else {
          // Formattazione Ora con Luxon (messaggi inviati e ricevuti)
          let now = DateTime.now().toFormat('HH:mm');
          this.contacts[activeItem].messages.push({ date: now, message: this.userMessage.message, status: 'sent' });
          this.userMessage.message = '';
          this.error = false;
          // Nel caso in cui il messaggio superi i due requisiti
          // Risposta automatica dopo 1 secondo
          setTimeout(() => {
            this.contacts[activeItem].messages.push({ date: now, message: 'OK', status: 'received' });
          }, 1000);
          
        }
    },

    // Mostra o fai scomparire le impostazioni del messaggio relativo (info e elimina messaggio)
    toggleMessageSettings(i) {
      // console.log('Click Messaggio ' + i);
      // this.contacts.visible = !this.contacts.visible;
      this.settingActive = !this.settingActive;
      this.activeMessage = i;
    },

    // Cancella il messaggio corrispondente
    deleteMessage(activeItem, i) {
      this.contacts[activeItem].messages.splice(i, 1);
    }    

  },

  mounted() {
    // Formattazione Ora con Luxon
    this.contacts.forEach(contact => {
      contact.messages.forEach(message => {
        message.date = luxon.DateTime.fromFormat(message.date, 'dd/MM/yyyy HH:mm:ss').toFormat('HH:mm:ss');
      });
    });
  }

}).mount('#app')
