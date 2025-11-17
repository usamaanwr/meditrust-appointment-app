const supbaseUrl = `https://wertaibhtusrnnewcmpf.supabase.co`;
const supbaseAnonKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcnRhaWJodHVzcm5uZXdjbXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDk4MjQsImV4cCI6MjA3NzY4NTgyNH0.vhoC8RAAdom7Zwrn_ahTriyNSctKfuhArySBXMhtytY`;
const client = supabase.createClient(supbaseUrl, supbaseAnonKey);
console.log(client);

export const fetchAllDoctors = async () => {
  const { data, error } = await client.from("Doctors").select();
  if (error) {
    console.error(error);
    return error;
  } else {
    console.log(data);
    return data;
  }
};

export const detailByDoctorId = async (id) => {
  const { data, error } = await client
    .from("Doctors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching doctor detail:", error);
    return error;
  }
  return data;
};
export const appointmentCreate = async (appointmentdata) => {
  const { data, error } = await client
    .from("appointment")
    .insert(appointmentdata)
    .select();

  if (error) {
    console.error("Error fetching doctor detail:", error);
    return error;
  }
  return data;
};
export const fetchAllAppointment = async (appointmentdata) => {
  const { data, error } = await client.from("appointment").select();

  if (error) {
    console.error("Error fetching doctor detail:", error);
    return error;
  }
  return data;
};

export const createNewUser = async (email, password, name, age) => {
  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: name,
        age: age,
      },
    },
  });

  if (error) {
    console.error(error);
    return error;

    //      Toastify({
    //   text: "this Email is alerady registered",
    //   duration: 3000,
    //   gravity: "top",
    //   position: "right",
    //   backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    // }).showToast();
  }
  console.log(data);
  return data;
};

//
export const isUserSignIn = async () => {
  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error.message);
    return error;
  } else {
    console.log(data);
    return data;
  }
};

export const signOutUser = async () => {
  const { error } = await client.auth.signOut();

  if (error) {
    console.error(error.message);
    return error;
  }
};

export const getUserSession = async () => {
  const { data, error } = await client.auth.getSession();

  if (error) {
    console.error(error);
    return error;
  }
  console.log(data);
  return data;
};

export const getLoggedInUser = async () => {
  const {
    data: { user },
  } = await client.auth.getUser();

  console.log(user);
  return user;
};
