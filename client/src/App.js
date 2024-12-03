import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Components/Index/Index";
import PatientRegister from "./Components/PatientRegister/PatientRegister";
import Login from "./Components/Login/Login";
import PatientHome from "./pages/Patient/PatientHome";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import NotFound from "./Components/NotFound/NotFound";
import AdminHome from "./pages/Admin/AdminHome";
import AdminAddDoctor from "./pages/Admin/AdminAddDoctor";
import AdminViewDoctorPage from "./pages/Admin/AdminViewDoctorPage";
import AccountHome from "./pages/Account/AccountHome";
import PatientViewDoctor from "./pages/Patient/PatientViewDoctor";
import PatientBookAppointment from "./pages/Patient/PatientBookAppointment";
import PatientConfirmAppointment from "./pages/Patient/PatientConfirmAppointment";
import PatientViewAppointments from "./pages/Patient/PatientViewAppointments";
import ChangePassword from "./pages/PasswordChange/ChangePassword";
import DoctorIndex from "./pages/Doctor/DoctorIndex";
import AdminAddPharmacyStaff from "./pages/Admin/AdminAddPharmacyStaff";
import AdminAddAccountStaff from "./pages/Admin/AdminAddAccountStaff";
import AdminAddLabStaff from "./pages/Admin/AdminAddLabStaff";
import DoctorViewAppointments from "./pages/Doctor/DoctorViewAppointments";
import DoctorAddPrescription from "./pages/Doctor/DoctorAddPrescription";
import DoctorViewPrescriptionHistory from "./pages/Doctor/DoctorViewPrescriptionHistory";
import PatientAppointmentHistory from "./pages/Patient/PatientAppointmentHistory";
import PatientViewPrescription from "./pages/Patient/PatientViewPrescription";
import AdminViewPatients from "./pages/Admin/AdminViewPatients";
import AdminViewAccounts from "./pages/Admin/AdminViewAccounts";
import AdminViewPharmacy from "./pages/Admin/AdminViewPharmacy";
import PharmacyHome from "./pages/Pharmacy/PharmacyHome";
import PharmacyViewPrescriptions from "./pages/Pharmacy/PharmacyViewPrescriptions";
import PatientBookTeleConsultation from "./pages/Patient/PatientBookTeleConsultation";
import PatientConfirmTeleConsultation from "./pages/Patient/PatientConfirmTeleConsultation";
import PatientViewTeleconsultations from "./pages/Patient/PatientViewTeleconsultations";
import AdminViewLab from "./pages/Admin/AdminViewLab";
import VideoConference from "./Components/Patient/VideoConference/VideoConference";
import DoctorViewTeleConsultation from "./pages/Doctor/DoctorViewTeleConsultation";
import PharmacyViewMedicine from "./pages/Pharmacy/PharmacyViewMedicine";
import LabHome from "./pages/Lab/LabHome";
import LabViewTests from "./pages/Lab/LabViewTests";
import AdminViewMedicines from "./pages/Admin/AdminViewMedicines";
import AdminViewTests from "./pages/Admin/AdminViewTests";
import AdminAddMedicine from "./pages/Admin/AdminAddMedicine";
import AdminAddTest from "./pages/Admin/AdminAddTest";
import AdminNotification from "./pages/Admin/AdminNotification";
import PatientNotification from "./pages/Patient/PatientNotification";
import PharmacyNotification from "./pages/Pharmacy/PharmacyNotification";
import AccountsNotification from "./pages/Account/AccountsNotification";
import LabNotification from "./pages/Lab/LabNotification";
import DoctorNotification from "./pages/Doctor/DoctorNotification";
import DoctorViewTeleDetails from "./pages/Doctor/DoctorViewTeleDetails";
import DoctorLeaveMarking from "./pages/Doctor/DoctorLeaveMarking";
import AdminViewLeave from "./pages/Admin/AdminViewLeave";
import LabViewPrescriptions from "./pages/Lab/LabViewPrescriptions";
import PatientProfilePage from "./pages/Patient/PatientProfilePage";
import PharmacyViewPrescriptionDetails from "./pages/Pharmacy/PharmacyViewPrescriptionDetails";
import LabViewPrescriptionDetails from "./pages/Lab/LabViewPrescriptionDetails";
import PatientPendingBills from "./pages/Patient/PatientPendingBills";
import PatientCompletedBills from "./pages/Patient/PatientCompletedBills";
import AccountPendingBills from "./pages/Account/AccountPendingBills";
import ReportSheet from "./pages/Account/ReportSheet";
import AdminViewEmptyMedicine from "./pages/Admin/AdminViewEmptyMedicine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/patient-home" element={<PatientHome />} />
        <Route path="/patient/view-doctor" element={<PatientViewDoctor />} />
        <Route
          path="/patient/book-appointment/:doctorId"
          element={<PatientBookAppointment />}
        />
        <Route
          path="/patient/book-teleconsultation/:doctorId"
          element={<PatientBookTeleConsultation />}
        />
        <Route
          path="/patient/confirm-appointment"
          element={<PatientConfirmAppointment />}
        />
        <Route
          path="/patient/confirm-teleconsultation"
          element={<PatientConfirmTeleConsultation />}
        />
        <Route
          path="/patient/appointments"
          element={<PatientViewAppointments />}
        />
        <Route
          path="/patient/teleconsultations"
          element={<PatientViewTeleconsultations />}
        />
        <Route path="/patient/notification" element={<PatientNotification />} />
        <Route path="/patient/bills/pending" element={<PatientPendingBills />} />
        <Route path="/patient/bills/completed" element={<PatientCompletedBills />} />
        <Route
          path="/pharmacy/notification"
          element={<PharmacyNotification />}
        />
        <Route path="/patient/profile" element={<PatientProfilePage />} />
        <Route
          path="/account/notification"
          element={<AccountsNotification />}
        />
        <Route path="/account/pending-bills" element={<AccountPendingBills />} />
        <Route path="/lab/notification" element={<LabNotification />} />
        <Route path="/doctor/notification" element={<DoctorNotification />} />
        <Route
          path="/patient/appointmentHistory"
          element={<PatientAppointmentHistory />}
        />
        <Route
          path="/prescription/:appointmentId"
          element={<PatientViewPrescription />}
        />
        <Route
          path="/change-password/:resetToken"
          element={<ChangePassword />}
        />
        <Route path="/doctor-home" element={<DoctorIndex />} />
        <Route
          path="/doctor/today-appointments"
          element={<DoctorViewAppointments />}
        />
        <Route
          path="/doctor/today-teleconsultation"
          element={<DoctorViewTeleConsultation />}
        />
        <Route path="/doctor/leave-request" element={<DoctorLeaveMarking />} />
        <Route
          path="/doctor/add-prescription/:appointmentId"
          element={<DoctorAddPrescription />}
        />
        <Route
          path="/patient/:patientId/prescriptions"
          element={<DoctorViewPrescriptionHistory />}
        />
        <Route
          path="/doctor/view-tele-details/:id"
          element={<DoctorViewTeleDetails />}
        />
        <Route path="/meeting/:meetingId" element={<VideoConference />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin/doctors/add-doctor" element={<AdminAddDoctor />} />
        <Route
          path="/admin/pharmacy-staff/add-pharmacy-staff"
          element={<AdminAddPharmacyStaff />}
        />
        <Route
          path="admin/account-staff/add-account-staff"
          element={<AdminAddAccountStaff />}
        />
        <Route
          path="/admin/lab-staff/add-lab-staff"
          element={<AdminAddLabStaff />}
        />
        <Route path="/account-home" element={<AccountHome />} />
        <Route path="/account/report" element={<ReportSheet />} />
        <Route
          path="/admin/doctors/view-doctors"
          element={<AdminViewDoctorPage />}
        />
        <Route path="/admin/view-patients" element={<AdminViewPatients />} />
        <Route path="/admin/view-accounts" element={<AdminViewAccounts />} />
        <Route path="/admin/view-pharmacy" element={<AdminViewPharmacy />} />
        <Route path="/admin/view-lab-staff" element={<AdminViewLab />} />
        <Route path="/admin/view-leaves" element={<AdminViewLeave />} />
        <Route
          path="/admin/medicine/add-medicine"
          element={<AdminAddMedicine />}
        />
        <Route
          path="/admin/medicine/view-medicine"
          element={<AdminViewMedicines />}
        />
         <Route
          path="/admin/medicine/empty-medicine"
          element={<AdminViewEmptyMedicine />}
        />
        <Route path="/admin/test/add-test" element={<AdminAddTest />} />
        <Route path="/admin/test/view-test" element={<AdminViewTests />} />
        <Route path="/admin/notification" element={<AdminNotification />} />
        <Route path="/pharmacy-home" element={<PharmacyHome />} />
        <Route
          path="/pharmacy/view-prescriptions"
          element={<PharmacyViewPrescriptions />}
        />
        <Route
          path="/pharmacy/view-medicine"
          element={<PharmacyViewMedicine />}
        />
        <Route
          path="/pharmacy/view-prescription-details/:prescriptionId"
          element={<PharmacyViewPrescriptionDetails />}
        />
        <Route path="/lab-home" element={<LabHome />} />
        <Route path="/lab/view-tests" element={<LabViewTests />} />
        <Route
          path="/lab/view-prescription"
          element={<LabViewPrescriptions />}
        />
        <Route
          path="/lab/view-prescription-details/:prescriptionId"
          element={<LabViewPrescriptionDetails />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
