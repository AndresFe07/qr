// import { LoginService } from './services/login.service';
// import { MessageService } from './services/message.service';
import { AuthConfig, OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { MessageService } from './services/message.service';
import { KeycloakService } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'QontRol';

  private baseUrl = 'http://192.168.2.16:8180/realms/'; // URL de Keycloak 

  username: string = '';
  isLogged: boolean = false;
  isAdmin: boolean = false;

  realms: any[] = [];
  clients: any[] = [];
  selectedRealm: string | null = 'qr';
  selectedClient: any | null = 'qr-frontend';


  constructor(
    private oauthService: OAuthService,
    private messageService: MessageService,
    private loginService: LoginService,
    private keycloakService: KeycloakService
  ) {
    this.configure();
  }


  ngOnInit(): void {
    this.keycloakService.getToken().subscribe(token => {
      this.keycloakService.getRealms(token).subscribe(realms => {
        this.realms = realms;
      });
    });
  }


  redirectUri = typeof window !== 'undefined' ? window.location.origin : '';

  authConfig: AuthConfig = {
    issuer: this.baseUrl + this.selectedRealm,
    redirectUri: this.redirectUri,
    clientId: this.selectedClient,
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
    requireHttps: false
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.getIdentityClaims()) {
          this.isLogged = this.loginService.getIsLogged();
          this.isAdmin = this.loginService.getIsAdmin();
          this.username = this.loginService.getUsername();
          this.messageService.sendMessage(this.loginService.getUsername());
        }
      });
  }

  onRealmSelect(realm: string): void {
    this.selectedRealm = realm;
    this.keycloakService.getToken().subscribe(token => {
      this.keycloakService.getClients(realm, token).subscribe(clients => {
        this.clients = clients;
      });
    });
  }

  onClientSelect(clientId: string): void {
    this.selectedClient = this.clients.find(client => client.clientId === clientId);
    console.log('Selected Client:', this.selectedClient);
    // Aquí puedes realizar el login usando el clientId seleccionado
  }

}
