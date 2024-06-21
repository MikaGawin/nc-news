import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { getTopics } from "../../AxiosApi/axiosApi";
import { Link } from "react-router-dom";

function Navbar() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
    });
  }, []);

  return (
    <Toolbar
      disableGutters
      id="navbar"
      variant="dense"
      sx={{ minHeight: 36.5, height: 36.5 }}
    >
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
       <Link to={`/`} style={{ textDecoration: "none" }}>
            <Button sx={{ my: 0, color: "white", display: "block" }}>
              Home
            </Button>
          </Link>
        {topics.map(({ slug }) => (
          <Link key={slug} to={`/topics/${slug}`} style={{ textDecoration: "none" }}>
            <Button  sx={{ my: 0, color: "white", display: "block" }}>
              {slug}
            </Button>
          </Link>
        ))}
      </Box>
    </Toolbar>
  );
}

export default Navbar;
