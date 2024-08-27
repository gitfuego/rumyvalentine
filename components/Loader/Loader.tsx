import { Box } from '@mui/joy'
import styles from './Loader.module.scss'

export default function() {
  return (
    <Box component="span" className={styles.loader}/>
  )
}