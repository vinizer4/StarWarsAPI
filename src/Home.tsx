import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import axios from "axios";
import { Eye, Heart } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/auth";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type People = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  skin_color: string;
  gender: string;
  birth_year: string;
};

function Home() {
  const [data, setData] = React.useState<People[]>([]);
  const [open, setOpen] = React.useState(false);
  const [people, setPeople] = React.useState<People>();
  const [favorites, setFavorites] = React.useState<People[]>([]);
  let colors: string[] = [];
  const columnsPeoples: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome",
      width: 300,
    },
    {
      field: "mass",
      headerName: "Massa",
      width: 100,
    },
    {
      field: "height",
      headerName: "Altura",
      width: 100,
    },
    {
      field: "hair_color",
      headerName: "Cor do Cabelo",
      width: 175,
    },
    {
      field: "skin_color",
      headerName: "Cor da Pele",
      width: 175,
    },
    {
      field: "eye_color",
      headerName: "Color dos Olhos",
      width: 200,
    },
    {
      field: "gender",
      headerName: "Gênero",
      width: 100,
    },
    {
      headerName: "Ações",
      field: "actions",
      type: "actions",
      renderCell: ({ row }) => (
        <>
          <IconButton
            onClick={() => {
              setPeople(row as unknown as People);
              setOpen(true);
            }}
          >
            <Eye size={32} />
          </IconButton>
          <IconButton
            onClick={() => {
              setFavorites([...favorites, row]);
            }}
          >
            <Heart size={32} />
          </IconButton>
        </>
      ),
    },
  ];
  const columnsFavorites: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome",
      width: 300,
    },
    {
      field: "mass",
      headerName: "Massa",
      width: 100,
    },
    {
      field: "height",
      headerName: "Altura",
      width: 100,
    },
    {
      field: "hair_color",
      headerName: "Cor do Cabelo",
      width: 175,
    },
    {
      field: "skin_color",
      headerName: "Cor da Pele",
      width: 175,
    },
    {
      field: "eye_color",
      headerName: "Color dos Olhos",
      width: 200,
    },
    {
      field: "gender",
      headerName: "Gênero",
      width: 100,
    },
  ];

  const { signed } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(signed);
    if (!signed) {
      navigate("/login");
    }
  });

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people")
      .then((res) => setData(res.data?.results));
  });

  const palette = (quantity: number) =>
    [
      "#00429d",
      "#4670b2",
      "#6b99c3",
      "#8cbdd0",
      "#aadad9",
      "#c8eedf",
      "#e5fbe1",
      "#ffffe0",
      "#ffcdba",
      "#ff9f9a",
      "#f3767e",
      "#e05167",
      "#c92f55",
      "#af1146",
      "#93003a",
    ].slice(0, quantity);

  type accTypeYear = {
    [year: string]: number;
  };

  type accTypeSkin = {
    [skyn: string]: number;
  };

  const years = data.reduce((r: accTypeYear, a: People): accTypeYear => {
    r[a.birth_year] = (r[a.birth_year] || 0) + 1;
    return r;
  }, {});

  const skins = data.reduce((r: accTypeSkin, a: People): accTypeSkin => {
    r[a.skin_color] = (r[a.skin_color] || 0) + 1;
    return r;
  }, {});

  console.log(Object.keys(years));

  console.log(Object.values(years));

  return (
    <Grid container display="flex" minHeight="100vh">
      <Grid justifyContent="space-evenly" alignItems="top" container item>
        <Grid>
          <Typography>Pessoas por idade</Typography>
          <Doughnut
            datasetIdKey="id"
            data={{
              labels: Object.keys(years),
              datasets: [
                {
                  label: "Pessoas por Idade",
                  data: Object.values(years),
                  backgroundColor: palette(Object.keys(years).length).map(
                    function (hex: string) {
                      return hex;
                    }
                  ),
                },
              ],
            }}
          />
        </Grid>
        <Grid>
          <Typography>Pessoas por cor da pele</Typography>
          <Doughnut
            datasetIdKey="id"
            data={{
              labels: Object.keys(skins),
              datasets: [
                {
                  label: "Pessoas por cor da pele",
                  data: Object.values(skins),
                  backgroundColor: palette(Object.keys(years).length).map(
                    function (hex: string) {
                      return hex;
                    }
                  ),
                },
              ],
            }}
          />
        </Grid>
      </Grid>

      <Grid item container direction="row">
        <Grid item xs={12} mb={1} mt={2}>
          <Typography>Lista de Pessoas</Typography>
          <DataGrid
            autoHeight
            columns={columnsPeoples}
            rows={data}
            getRowId={(row) => row.url}
            sx={{ mt: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Lista de Pessoas Favoritas</Typography>
          <DataGrid
            autoHeight
            columns={columnsFavorites}
            rows={favorites}
            getRowId={(row) => row.url}
            sx={{ mt: 2 }}
          />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{people?.name}</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              sx={{ mb: 1, mt: 1 }}
              label="Altura"
              value={people?.height}
              disabled
            ></TextField>
            <TextField
              sx={{ mb: 1 }}
              label="Massa"
              value={people?.mass}
              disabled
            ></TextField>
            <TextField
              sx={{ mb: 1 }}
              label="Cor do Cabelo"
              value={people?.hair_color}
              disabled
            ></TextField>
            <TextField
              sx={{ mb: 1 }}
              label="Cor dos Olhos"
              value={people?.eye_color}
              disabled
            ></TextField>
            <TextField
              sx={{ mb: 1 }}
              label="Cor da Pele"
              value={people?.skin_color}
              disabled
            ></TextField>
            <TextField
              sx={{ mb: 1 }}
              label="Genero"
              value={people?.gender}
              disabled
            ></TextField>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default Home;
