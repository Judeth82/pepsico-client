export interface ClientDemandModel {
  serviceNumber?: string | null;
  idClient: string | null;
  clientName?: string | null;
  idSupervisor: string | null;
  supervisorName?: string | null;
  serviceCode: string | null;
  serviceName?: string | null;
  dateRequested?: string | null;
  status?: string | null;
}
