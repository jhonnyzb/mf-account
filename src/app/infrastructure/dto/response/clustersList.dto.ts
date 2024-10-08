export interface ClustersDto {
  clusterId: number
  clusterTypeId: number
  name: string
  programId: number
  description: string
  image: string
  characteristic1: string
  characteristic2: string
  characteristic3: string
  characteristic4: string
  order: number
  active: boolean
  lowerlimit: number
  upperlimit: number
  personGroupId: number
  isCatalog: boolean
  isSettlement: boolean
  isCommunications: boolean
  isMissions: boolean
  dateRegister: string
  dateUpdate: string
  personIdCreate: number
  personIdUpdate: number
}
