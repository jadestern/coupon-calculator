import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export const Search = () => {
  return (
    <Paper
      sx={{
        mb: 2,
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <InputBase
        sx={{ ml: 1 }}
        placeholder="상품 검색"
        inputProps={{ 'aria-label': '상품검색' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default Search
