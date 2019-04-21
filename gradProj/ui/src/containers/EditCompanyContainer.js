import EditCompany from "../components/EditCompany";
import { connect } from "react-redux";
import {
  editMainExecutor,
  changePasswordExecutor,
  editTypesOfCleaningExecutor
} from "../actions/CompanyActions";

const mapStateToProps = state => ({
  role: state.profileReducer.role,
  username: state.profileReducer.data.username,
  location: state.profileReducer.data.location,
  email: state.profileReducer.data.email,
  phone: state.profileReducer.data.phone,
  companyName: state.profileReducer.data.companyName,
  description: state.profileReducer.data.description,
  standartSmallRoom:
    state.profileReducer.data.typesOfCleaning.standart.standartSmallRoom,
  standartBigRoom:
    state.profileReducer.data.typesOfCleaning.standart.standartBigRoom,
  standartBathRoom:
    state.profileReducer.data.typesOfCleaning.standart.standartBathRoom,
  generalBigRoom:
    state.profileReducer.data.typesOfCleaning.general.generalBigRoom,
  generalSmallRoom:
    state.profileReducer.data.typesOfCleaning.general.generalSmallRoom,
  generalBathRoom:
    state.profileReducer.data.typesOfCleaning.general.generalBathRoom,
  afterRepairBigRoom:
    state.profileReducer.data.typesOfCleaning.afterRepair.afterRepairBigRoom,
  afterRepairSmallRoom:
    state.profileReducer.data.typesOfCleaning.afterRepair.afterRepairSmallRoom,
  afterRepairBathRoom:
    state.profileReducer.data.typesOfCleaning.afterRepair.afterRepairBathRoom,
  bigCarpet: state.profileReducer.data.typesOfCleaning.carpet.bigCarpet,
  smallCarpet: state.profileReducer.data.typesOfCleaning.carpet.smallCarpet,
  office: state.profileReducer.data.typesOfCleaning.office,
  industrial: state.profileReducer.data.typesOfCleaning.industrial,
  furniture: state.profileReducer.data.typesOfCleaning.furniture,
  pool: state.profileReducer.data.typesOfCleaning.pool
});

const EditCompanyContainer = connect(
  mapStateToProps,
  { editMainExecutor, changePasswordExecutor, editTypesOfCleaningExecutor }
)(EditCompany);

export default EditCompanyContainer;
