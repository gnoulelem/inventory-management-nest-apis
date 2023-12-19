import {Collection} from "mongodb";
import {IBill} from "../../../domains/bill";

export abstract class IBillProvider extends Collection<IBill> {}
