import {Injectable} from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as process from 'process';
import {app} from "firebase-admin";
import App = app.App;

@Injectable()
export class ModuleInit {
  static init(): App {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.INSIDERS_FIREBASE_PROJECT_ID,
        clientEmail: process.env.INSIDERS_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.INSIDERS_FIREBASE_PRIVATE_KEY,
      }),
    }, 'insiders');
  }
}
