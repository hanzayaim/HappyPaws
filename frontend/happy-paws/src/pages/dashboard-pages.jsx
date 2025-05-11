import { Label } from "@radix-ui/react-label";
import Layout from "../app/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ClipboardPlus, Ham, Hammer, PawPrint, Syringe } from "lucide-react";
import { determineAnimalStatus } from "./animal-management";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [Finance, setFinance] = useState({});
  const [totalAnimals, setTotalAnimals] = useState({});
  const [totalAnimalsAdopted, setTotalAnimalsAdopted] = useState({});
  const [totalAnimalsAvailable, setTotalAnimalsAvailable] = useState({});
  const [totalAnimalsNotAvailable, setTotalAnimalsNotAvailable] = useState({});
  const [totalMedicalRecords, setTotalMedicalRecords] = useState({});
  const [totalHealthyAnimals, setTotalHealthyAnimals] = useState({});
  const [totalSickAnimals, setTotalSickAnimals] = useState({});
  const [totalDiedAnimals, setTotalDiedAnimals] = useState({});
  const [totalVaccinRecords, setTotalVaccinRecords] = useState({});
  const [totalVaccinAnimals, setTotalVaccinAnimals] = useState({});
  const [totalNotVaccinAnimals, setTotalNotVaccinsAnimals] = useState({});
  const [totalCategoryFood, setTotalCategoryFood] = useState({});
  const [totalDryFood, setTotalDryFood] = useState({});
  const [totalWetFood, setTotalWetFood] = useState({});
  const [totalTypeFood, setTotalTypeFood] = useState({});
  const [totalDonationFood, setTotalDonationFood] = useState({});
  const [totalNonDonationFood, setTotalNonDonationFood] = useState({});
  const [totalTypeEquipment, setTotalTypeEquipment] = useState({});
  const [totalDonationEquipment, setTotalDonationEquipment] = useState({});
  const [totalNonDonationEquipment, setTotalNonDonationEquipment] = useState(
    {}
  );
  const [getLoss, setLoss] = useState(0);
  const [getProfit, setProfit] = useState(0);
  const navigate = useNavigate();

  const currentUser = async () => {
    try {
      const response = await axios.get("/api/auth/profile", {
        withCredentials: true,
      });
      if (response) {
        setUserData(response.data.profile);
      }
    } catch (error) {
      console.error("Error user data", error);
      navigate("/login");
    }
  };

  const fetchIncomeData = async () => {
    try {
      const incomesRes = await axios.get(
        `/api/income/getIncome/${userData.id_shelter}`
      );
      const incomesData = incomesRes.data;

      if (incomesData.error) {
        throw new Error(incomesData.message || "Failed to fetch incomes");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchExpensesData = async () => {
    try {
      const expensesRes = await axios.get(
        `/api/expenses/getExpenses/${userData.id_shelter}`
      );
      const expensesData = expensesRes.data;

      if (expensesData.error) {
        throw new Error(expensesData.message || "Failed to fetch incomes");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchSalaryData = async () => {
    try {
      const SalaryRes = await axios.get(
        `/api/salary/getSalary/${userData.id_shelter}`
      );
      if (SalaryRes.status === 404) {
        console.log("Salary not found");
        return;
      }
      const SalaryData = SalaryRes.data;
      if (SalaryData.error) {
        throw new Error(SalaryData.message || "Failed to fetch Salary");
      }
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
  };

  const fetchFinanceData = async () => {
    fetchIncomeData();
    fetchSalaryData();
    fetchExpensesData();
    try {
      const FinanceRes = await axios.get(
        `/api/finance/getFinance/${userData.id_shelter}`
      );
      const ProfitRes = await axios.post(`/api/finance/getPorfit`, {
        id_shelter: userData.id_shelter,
      });
      const LossRes = await axios.post(`/api/finance/getLoss`, {
        id_shelter: userData.id_shelter,
      });
      const FinanceData = FinanceRes.data;
      const ProfitData = ProfitRes.data;
      const LossData = LossRes.data;
      if (FinanceData.error) {
        throw new Error(FinanceData.message || "Failed to fetch Finance");
      }
      if (ProfitData.error) {
        throw new Error(ProfitData.message || "Failed to fetch Profit");
      }
      if (LossData.error) {
        throw new Error(LossData.message || "Failed to fetch Loss");
      }
      setFinance(FinanceData.data?.[0] ?? "No data");
      setLoss(LossData.result ?? 0);
      setProfit(ProfitData.result ?? 0);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchAnimalData = async () => {
    try {
      const [animalRes, medicalRes] = await Promise.allSettled([
        axios.get(`/api/animals/getAnimalData/${userData.id_shelter}`),
        axios.get(`/api/medical/getMedicalData/${userData.id_shelter}`),
      ]);

      if (animalRes.status !== "fulfilled") {
        throw new Error("Failed to fetch animal data");
      }

      const animalDataFetch = animalRes.value.data;
      const medicalDataFetch =
        medicalRes.status === "fulfilled"
          ? medicalRes.value.data
          : { data: [] };

      const enrichedAnimalData = (animalDataFetch.data || []).map((animal) => {
        const medical = (medicalDataFetch.data || []).find(
          (m) => m.id_animal === animal.id_animal
        );

        const animal_status = determineAnimalStatus(
          medical?.medical_status,
          medical?.vaccin_status,
          animal.id_adopter
        );

        return {
          ...animal,
          animal_status,
        };
      });

      setTotalAnimalsAdopted(
        enrichedAnimalData.filter(
          (animal) => animal.animal_status === "Adopted"
        ).length
      );

      setTotalAnimalsAvailable(
        enrichedAnimalData.filter(
          (animal) => animal.animal_status === "Available"
        ).length
      );

      setTotalAnimalsNotAvailable(
        enrichedAnimalData.filter(
          (animal) => animal.animal_status === "Not Available"
        ).length
      );

      setTotalHealthyAnimals(
        medicalDataFetch.data.filter(
          (medical) => medical.medical_status === "Healthy"
        ).length
      );

      setTotalSickAnimals(
        medicalDataFetch.data.filter(
          (medical) => medical.medical_status === "Sick"
        ).length
      );

      setTotalDiedAnimals(
        medicalDataFetch.data.filter(
          (medical) => medical.medical_status === "Died"
        ).length
      );

      setTotalVaccinAnimals(
        medicalDataFetch.data.filter(
          (medical) => medical.vaccin_status === "Vaccinated"
        ).length
      );

      setTotalNotVaccinsAnimals(
        medicalDataFetch.data.filter(
          (medical) => medical.vaccin_status === "Not Vaccinated"
        ).length
      );

      setTotalVaccinRecords(
        medicalDataFetch.data.filter(
          (medical) => medical.vaccin_status === "Vaccinated"
        ).length +
          medicalDataFetch.data.filter(
            (medical) => medical.vaccin_status === "Not Vaccinated"
          ).length
      );

      setTotalAnimals(enrichedAnimalData.length);

      setTotalMedicalRecords(
        medicalDataFetch.data.filter(
          (medical) => medical.medical_status === "Healthy"
        ).length +
          medicalDataFetch.data.filter(
            (medical) => medical.medical_status === "Sick"
          ).length +
          medicalDataFetch.data.filter(
            (medical) => medical.medical_status === "Died"
          ).length
      );
    } catch (error) {
      console.error("Error fetching animal data:", error);
    }
  };

  const fetchFoodsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/food/getFoodData/${userData.id_shelter}`
      );

      const foodsData = response.data;

      if (foodsData.error) {
        throw new Error(foodsData.message || "Failed to fetch foods");
      }

      setTotalDryFood(
        foodsData.data.filter((food) => food.category === "Makanan Kering")
          .length
      );

      setTotalWetFood(
        foodsData.data.filter((food) => food.category === "Makanan Basah")
          .length
      );

      setTotalDonationFood(
        foodsData.data.filter((food) => food.type === "Donasi").length
      );

      setTotalNonDonationFood(
        foodsData.data.filter((food) => food.type === "Beli").length
      );

      setTotalCategoryFood(
        foodsData.data.filter((food) => food.category === "Makanan Kering")
          .length +
          foodsData.data.filter((food) => food.category === "Makanan Basah")
            .length
      );
      setTotalTypeFood(
        foodsData.data.filter((food) => food.type === "Donasi").length +
          foodsData.data.filter((food) => food.type === "Beli").length
      );
    } catch (error) {
      console.error("Error fetching food data", error);
    }
  };

  const fetchEquipmentsData = async () => {
    try {
      const equipmentRes = await axios.get(
        `http://localhost:3000/api/equipment/getEquipmentData/${userData.id_shelter}`
      );
      const equipmentData = equipmentRes.data;

      if (equipmentData.error) {
        throw new Error(equipmentData.message || "Failed to fetch equipments");
      }

      setTotalDonationEquipment(
        equipmentData.data.filter((equipment) => equipment.type === "Donasi")
          .length
      );

      setTotalNonDonationEquipment(
        equipmentData.data.filter((equipment) => equipment.type === "Beli")
          .length
      );

      setTotalTypeEquipment(
        equipmentData.data.filter((equipment) => equipment.type === "Donasi")
          .length +
          equipmentData.data.filter((equipment) => equipment.type === "Beli")
            .length
      );
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);
  useEffect(() => {
    if (userData) {
      fetchFinanceData();
      fetchAnimalData();
      fetchFoodsData();
      fetchEquipmentsData();
    }
  }, [userData]);

  if (!userData) {
    return (
      <Card className="text-center w-auto h-auto gap-2 justify-center bg-primary/90 text-white">
        <CardHeader>
          <CardTitle className="text-xl">Loading...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center">
          <div>Please wait</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Layout>
      <div className="flex-row min-h-svh bg-gray-50 w-full p-6 md:p-10">
        <div className="flex flex-col">
          <Label className="lg:text-3xl md:text-2xl font-bold text-xl">
            Dashboard
          </Label>
          <Label className="lg:text-2xl md:text-xl text-lg">
            Welcome Back, {userData?.owner_name || userData?.name} !
          </Label>
        </div>
        <div className="w-full flex justify-center items-center ">
          <Card className="lg:min-w-lg w-lg">
            <CardHeader>
              <CardTitle className="text-center">Current Balance</CardTitle>
            </CardHeader>
            <CardContent className="flex w-full justify-center items-center ">
              <Label
                className={`lg:text-3xl text-2xl ${
                  Finance.total_balance < 0 ? "text-red-700" : ""
                }`}
              >
                {typeof Finance.total_balance === "number"
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Finance.total_balance)
                  : Finance.total_balance}
              </Label>
            </CardContent>
            <CardFooter className="flex lg:flex-row flex-col w-full justify-between items-center ">
              <p className="flex">
                Profit:
                <span className="text-green-600">
                  {" +"}
                  {typeof getProfit === "number"
                    ? new Intl.NumberFormat("id-ID").format(getProfit)
                    : getProfit}
                </span>
              </p>
              <p className="flex">
                Loss:
                <span className="text-red-600">
                  {" -"}
                  {typeof getLoss === "number"
                    ? new Intl.NumberFormat("id-ID").format(getLoss)
                    : getLoss}
                </span>
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-3 mt-3">
          <Card className="w-full lg:w-2/5">
            <CardHeader>
              <CardTitle className="flex justify-between">
                Total Equipment
                <Hammer />
              </CardTitle>
              <CardTitle className="flex justify-center font-medium lg:text-3xl text-2xl">
                {typeof totalTypeEquipment === "number"
                  ? new Intl.NumberFormat("id-ID").format(totalTypeEquipment)
                  : "No Data"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row gap-2">
              <Card className="w-full text-center">
                <CardHeader>
                  <CardTitle className="text-sm">Donation</CardTitle>
                </CardHeader>
                <CardContent>
                  {typeof totalDonationEquipment === "number"
                    ? new Intl.NumberFormat("id-ID").format(
                        totalDonationEquipment
                      )
                    : "No Data"}
                </CardContent>
              </Card>
              <Card className="w-full text-center">
                <CardHeader>
                  <CardTitle className="text-sm">Non - Donation</CardTitle>
                </CardHeader>
                <CardContent>
                  {typeof totalNonDonationEquipment === "number"
                    ? new Intl.NumberFormat("id-ID").format(
                        totalNonDonationEquipment
                      )
                    : "No Data"}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <Card className="lg:w-3/5">
            <CardHeader>
              <CardTitle className="flex justify-between">
                Total Animals in Shelter
                <PawPrint />
              </CardTitle>
              <CardTitle className="flex justify-center font-medium lg:text-3xl text-2xl">
                {typeof totalAnimals === "number"
                  ? new Intl.NumberFormat("id-ID").format(totalAnimals)
                  : "No Data"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row gap-2">
              <Card className="w-full text-center">
                <CardHeader>
                  <CardTitle className="text-sm text-[#26B521]">
                    Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {typeof totalAnimalsAvailable === "number"
                    ? new Intl.NumberFormat("id-ID").format(
                        totalAnimalsAvailable
                      )
                    : "No Data"}
                </CardContent>
              </Card>
              <Card className="w-full text-center">
                <CardHeader>
                  <CardTitle className="text-sm text-red-500">
                    Not Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {" "}
                  {typeof totalAnimalsNotAvailable === "number"
                    ? new Intl.NumberFormat("id-ID").format(
                        totalAnimalsNotAvailable
                      )
                    : "No Data"}
                </CardContent>
              </Card>
              <Card className="w-full text-center">
                <CardHeader>
                  <CardTitle className="text-sm text-red-500">
                    Adopted
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {" "}
                  {typeof totalAnimalsAdopted === "number"
                    ? new Intl.NumberFormat("id-ID").format(totalAnimalsAdopted)
                    : "No Data"}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
        <div className="mt-3 flex flex-col justify-center gap-3">
          <div className="w-full flex flex-col lg:flex-row gap-3 mt-3">
            <Card className="w-full lg:w-2/5">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  Animals with Vaccin Records
                  <Syringe />
                </CardTitle>
                <CardTitle className="flex justify-center font-medium lg:text-3xl text-2xl">
                  {typeof totalVaccinRecords === "number"
                    ? new Intl.NumberFormat("id-ID").format(totalVaccinRecords)
                    : "No Data"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col lg:flex-row gap-2">
                <Card className="w-full text-center">
                  <CardHeader>
                    <CardTitle className="text-sm text-[#26B521]">
                      Vaccinated
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof totalVaccinAnimals === "number"
                      ? new Intl.NumberFormat("id-ID").format(
                          totalVaccinAnimals
                        )
                      : "No Data"}
                  </CardContent>
                </Card>
                <Card className="w-full text-center">
                  <CardHeader>
                    <CardTitle className="text-sm text-red-500">
                      Not Vaccinated
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof totalNotVaccinAnimals === "number"
                      ? new Intl.NumberFormat("id-ID").format(
                          totalNotVaccinAnimals
                        )
                      : "No Data"}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            <Card className="lg:w-3/5">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  Animals with Medical Records
                  <ClipboardPlus />
                </CardTitle>
                <CardTitle className="flex justify-center font-medium lg:text-3xl text-2xl">
                  {typeof totalMedicalRecords === "number"
                    ? new Intl.NumberFormat("id-ID").format(totalMedicalRecords)
                    : "No Data"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col lg:flex-row gap-2">
                <Card className="w-full text-center">
                  <CardHeader>
                    <CardTitle className="text-sm text-[#26B521]">
                      Healthy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof totalHealthyAnimals === "number"
                      ? new Intl.NumberFormat("id-ID").format(
                          totalHealthyAnimals
                        )
                      : "No Data"}
                  </CardContent>
                </Card>
                <Card className="w-full text-center">
                  <CardHeader>
                    <CardTitle className="text-sm text-red-500">Sick</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {" "}
                    {typeof totalSickAnimals === "number"
                      ? new Intl.NumberFormat("id-ID").format(totalSickAnimals)
                      : "No Data"}
                  </CardContent>
                </Card>
                <Card className="w-full text-center">
                  <CardHeader>
                    <CardTitle className="text-sm text-red-500">Died</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {" "}
                    {typeof totalDiedAnimals === "number"
                      ? new Intl.NumberFormat("id-ID").format(totalDiedAnimals)
                      : "No Data"}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  Total Food by Category
                  <Ham />
                </CardTitle>
                <CardTitle className="flex justify-center font-medium lg:text-3xl text-2xl">
                  {typeof totalCategoryFood === "number"
                    ? new Intl.NumberFormat("id-ID").format(totalCategoryFood)
                    : "No Data"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col lg:flex-row gap-2">
                <Card className="w-full text-center">
                  <CardHeader>
                    <CardTitle className="text-sm">Dry Food</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof totalDryFood === "number"
                      ? new Intl.NumberFormat("id-ID").format(totalDryFood)
                      : "No Data"}
                  </CardContent>
                </Card>
                <Card className="w-full text-center">
                  <CardHeader>
                    <CardTitle className="text-sm">Wet Food</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof totalWetFood === "number"
                      ? new Intl.NumberFormat("id-ID").format(totalWetFood)
                      : "No Data"}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  Total Food by Type
                  <Ham />
                </CardTitle>
                <CardTitle className="flex justify-center font-medium lg:text-3xl text-2xl">
                  {typeof totalTypeFood === "number"
                    ? new Intl.NumberFormat("id-ID").format(totalTypeFood)
                    : "No Data"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col lg:flex-row gap-2">
                <Card className="w-full text-center">
                  <CardHeader>
                    <CardTitle className="text-sm">Donation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof totalDonationFood === "number"
                      ? new Intl.NumberFormat("id-ID").format(totalDonationFood)
                      : "No Data"}
                  </CardContent>
                </Card>
                <Card className="w-full text-center">
                  <CardHeader>
                    <CardTitle className="text-sm">Non - Donation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof totalNonDonationFood === "number"
                      ? new Intl.NumberFormat("id-ID").format(
                          totalNonDonationFood
                        )
                      : "No Data"}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
