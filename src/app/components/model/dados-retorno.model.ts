import {CandidatosPorEstadoModel} from "./candidatos-por-estado.model";
import {MediaImcIdadeModel} from "./media-imc-idade.model";
import {PercentualObesosModel} from "./percentual-obesos.model";
import {DadosTipoSanguineoModel} from "./dados-tipo-sanguineo.model";

export class DadosRetornoModel {
  candidatosPorEstadoDTOList!: Array<CandidatosPorEstadoModel>;
  mediaImcIdadeDTOS!: Array<MediaImcIdadeModel>;
  percentualObesosDTOS!: Array<PercentualObesosModel>;
  dadosTipoSanguineoDTOS!: Array<DadosTipoSanguineoModel>;
}
