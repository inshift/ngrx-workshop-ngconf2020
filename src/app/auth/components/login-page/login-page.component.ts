import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import {
  State,
  selectGettingAuthStatus,
  selectAuthUser,
  selectAuthError
} from "src/app/shared/state";
import { UserModel } from "src/app/shared/models";
import { AuthUserActions } from "../../actions";
import { LoginEvent } from "../login-form";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent {
  gettingStatus$: Observable<boolean>;
  user$: Observable<UserModel | null>;
  error$: Observable<string | null>;

  constructor(private store: Store<State>) {
    this.gettingStatus$ = this.store.select(selectGettingAuthStatus);
    this.user$ = this.store.select(selectAuthUser);
    this.error$ = this.store.select(selectAuthError);
  }

  onLogin($event: LoginEvent) {
    this.store.dispatch(AuthUserActions.login($event.username, $event.password));
  }
}
