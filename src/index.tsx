import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Drawer,
  IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/CloseOutlined'
import React, { useMemo, useState } from 'react'
import * as ThemeTweaker from 'theme-tweaker'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// eslint-disable-next-line no-unused-vars
import { makeStyles, Theme } from '@material-ui/core/styles'

const { ObjectMapper, useThemeTweaker } = ThemeTweaker

const useStyles = makeStyles((theme) => ({
  MuiTweakerButton: {
    position: 'fixed',
    left: 15,
    bottom: 15,
    zIndex: theme.zIndex.snackbar
  },
  anchorButtonList: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '10px'
  },
  chipsGroupRow: {
    display: 'flex',
    margin: '14px',
    justifyContent: 'center',
    maxWidth: '500px'
  },
  chipsGroup: {
    display: 'flex',
    margin: 'auto',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5
  }
}))

export function MuiTweaker() {
  const classes = useStyles()
  const [tweakerPanelOpened, setTweakerPanelOpened] = useState(false)
  const { theme, setThemeProp } = useThemeTweaker<Theme>()
  const [anchor, setAnchor] = useState<'left' | 'right'>('right')
  const [excluded, setExcluded] = useState<
    Partial<Record<keyof Theme, boolean>>
  >({
    breakpoints: true,
    direction: true,
    mixins: true,
    overrides: true,
    palette: true,
    props: true,
    shadows: true,
    shape: true,
    spacing: true,
    transitions: true,
    typography: true,
    zIndex: true
  })

  const mapper = useMemo(
    () => (
      <ObjectMapper
        object={theme}
        primitiveMapping={(
          propName: string,
          value: number | string,
          propPath: string
        ) => {
          if (typeof value === 'number') {
            return (
              <input
                type='number'
                onChange={(e) => {
                  setThemeProp(propPath, Number(e.target.value))
                }}
                placeholder={propName}
                defaultValue={value}
              />
            )
          }

          if (typeof value === 'string') {
            return value.includes('#') ? (
              <input
                onChange={(e) => {
                  const value = e.target.value
                  setThemeProp(propPath, value)
                }}
                type='color'
                placeholder={propName}
                defaultValue={value}
              />
            ) : (
              <input
                onChange={(e) => {
                  const value = e.target.value
                  setThemeProp(propPath, value)
                }}
                placeholder={propName}
                defaultValue={value}
              />
            )
          }
          return undefined
        }}
        mapping={(mapResult, nestingLevel: number) => {
          return (
            <span>
              {Object.entries(mapResult).map(([key, component]) => {
                return (
                  <Accordion
                    key={key}
                    TransitionProps={{
                      unmountOnExit: true
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {key}
                    </AccordionSummary>

                    <AccordionDetails>
                      <div
                        style={{
                          textAlign: 'center',
                          width: '100%',
                          margin: 10 * (nestingLevel + 1)
                        }}
                      >
                        {component as React.ReactElement}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )
              })}
            </span>
          )
        }}
        exclude={excluded}
      />
    ),
    [theme, setThemeProp, excluded]
  )

  return (
    <div className={classes.MuiTweakerButton}>
      <Button variant='contained' onClick={() => setTweakerPanelOpened(true)}>
        Edit Theme
      </Button>
      <Drawer
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
        anchor={anchor}
        open={tweakerPanelOpened}
        onClose={() => setTweakerPanelOpened(false)}
        PaperProps={{
          style: { maxWidth: '500px' }
        }}
      >
        <div className={classes.anchorButtonList}>
          <Button variant='outlined' onClick={() => setAnchor('left')}>
            Left
          </Button>
          <Button variant='outlined' onClick={() => setAnchor('right')}>
            Right
          </Button>
          <IconButton className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.chipsGroupRow}>
          <div className={classes.chipsGroup}>
            {Object.entries(excluded).map(([key, isExcluded]) => (
              <Chip
                size='small'
                variant='outlined'
                label={key}
                onClick={() =>
                  setExcluded({
                    ...excluded,
                    [key]: !excluded[key as keyof Theme]
                  })
                }
                key={key}
                color={isExcluded ? 'default' : 'primary'}
              />
            ))}
          </div>
        </div>
        {mapper}
      </Drawer>
    </div>
  )
}

export const createThemeTweaker = ThemeTweaker.createThemeTweaker
