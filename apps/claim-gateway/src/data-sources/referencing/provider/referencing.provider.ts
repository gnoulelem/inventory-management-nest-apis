import {Collection} from "mongodb";
import {IReferencing} from "../../../domains/referencing";

export abstract class IReferencingProvider extends Collection<IReferencing> {
}
