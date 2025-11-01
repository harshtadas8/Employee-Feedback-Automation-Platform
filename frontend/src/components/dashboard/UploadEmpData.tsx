import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Modal,
  CircularProgress,
} from "@mui/material";

const dataTypes = [
  "Activity Records",
  "Leave Records",
  "Onboarding Experience",
  "Performance Records",
  "Rewards Data",
  "Vibemeter Data",
];

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

function UploadEmpData() {
  const [isMobile, setIsMobile] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>(
    Array(dataTypes.length).fill(null)
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1124);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files[0]) {
      const updatedFiles = [...uploadedFiles];
      updatedFiles[index] = event.target.files[0];
      setUploadedFiles(updatedFiles);
    }
  };

  const allFilesUploaded = uploadedFiles.every((file) => file !== null);

  const handleUploadAll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setUploadedFiles(Array(dataTypes.length).fill(null));
      setTimeout(() => {
        setIsSuccess(false);
        window.location.href = "/employee-analysis";
      }, 2000);
    }, 2000);
  };

  const renderTableRows = (start: number, end: number) =>
    dataTypes.slice(start, end).map((label, index) => {
      const actualIndex = start + index;
      return (
        <TableRow key={actualIndex}>
          <TableCell>{label}</TableCell>
          <TableCell>
            {uploadedFiles[actualIndex] && (
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => {
                  const fileURL = URL.createObjectURL(
                    uploadedFiles[actualIndex]!
                  );
                  window.open(fileURL, "_blank");
                }}
              >
                {uploadedFiles[actualIndex]?.name}
              </Typography>
            )}
          </TableCell>

          <TableCell align="right">
            <input
              type="file"
              accept=".csv,"
              style={{ display: "none" }}
              id={`file-upload-${actualIndex}`}
              onChange={(e) => handleFileChange(e, actualIndex)}
            />
            <label htmlFor={`file-upload-${actualIndex}`}>
              <Button
                variant="outlined"
                component="span"
                size="small"
                startIcon={<CloudUploadIcon />}
                sx={{
                  minWidth: 140,
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "background.paper",
                    borderColor: "primary.dark",
                  },
                  "&:active": {
                    backgroundColor: "primary.dark",
                    borderColor: "primary.dark",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Upload
              </Button>
            </label>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upload Employee Data
      </Typography>

      {isMobile ? (
        <TableContainer component={Paper} sx={{ width: "100%", my: 4 }}>
          <Table>
            <TableBody>{renderTableRows(0, dataTypes.length)}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ maxWidth: "45%", minWidth: 400, my: 4 }}
          >
            <Table>
              <TableBody>
                {renderTableRows(0, Math.floor(dataTypes.length / 2))}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer
            component={Paper}
            sx={{ maxWidth: "45%", minWidth: 400, my: 4 }}
          >
            <Table>
              <TableBody>
                {renderTableRows(
                  Math.floor(dataTypes.length / 2),
                  dataTypes.length
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          disabled={!allFilesUploaded || isProcessing}
          onClick={handleUploadAll}
        >
          Upload All Files
        </Button>
      </Box>

      <Modal
        open={isProcessing && !isSuccess}
        aria-labelledby="processing-modal"
      >
        <Box sx={modalStyle}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Processing files...
          </Typography>
        </Box>
      </Modal>
      <Modal open={isSuccess} aria-labelledby="success-modal">
        <Box sx={modalStyle}>
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green" }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Files processed successfully!
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default UploadEmpData;
